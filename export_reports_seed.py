"""Выгружает отчёты из dev-БД report в переносимый SQL-файл для прода.

Читает MS SQL (контейнер mssql), пишет db/prod/02_seed_reports.sql.
Использование:
    python tools/export_reports_seed.py
"""
import io
import json
import os
import subprocess
import sys

MS_CONTAINER = "mssql"
MS_SA_PASSWORD = os.environ.get("MSSQL_SA_PASSWORD", "YourStrong@Passw0rd")
SQLCMD = "/opt/mssql-tools18/bin/sqlcmd"

KEYS = ("SEC_ОРН", "ОРН_5", "ОРН_9")
OUT_DIR = os.path.join("db", "prod")
OUT_FILE = os.path.join(OUT_DIR, "02_seed_reports.sql")


def run(cmd):
    p = subprocess.run(cmd, capture_output=True)
    if p.returncode != 0:
        sys.exit("команда упала: %s\n%s\n%s" % (
            " ".join(cmd),
            p.stdout.decode("utf-8", "replace")[-3000:],
            p.stderr.decode("utf-8", "replace")[-2000:]))
    return p.stdout.decode("utf-8", "replace")


def fetch():
    """Данные берём через API бэкенда: sqlcmd ломает управляющие символы в FOR JSON."""
    import urllib.request

    base = os.environ.get("API_BASE", "http://localhost:7070")
    with urllib.request.urlopen(base + "/api/reports") as resp:
        items = json.loads(resp.read().decode("utf-8"))

    rows = []
    for item in items:
        if item.get("key") in KEYS:
            rows.append({
                "id": item["id"],
                "report_key": item["key"],
                "title": item.get("title", ""),
                "icon": item.get("icon") or "",
                "image": item.get("image") or "",
                "query_text": (item.get("query_text") or "").replace("\r\n", "\n"),
                "config": json.dumps(item.get("config") or {}, ensure_ascii=False),
                "parent_id": item.get("parent_id"),
                "is_section": 1 if item.get("is_section") else 0,
                "sort_order": item.get("sort_order") or 0,
            })
    if not rows:
        sys.exit("API не вернул ни одного из отчётов: %s" % ", ".join(KEYS))
    return rows


def fetch_toolbar():
    import urllib.request

    base = os.environ.get("API_BASE", "http://localhost:7070")
    with urllib.request.urlopen(base + "/api/toolbar") as resp:
        return resp.read().decode("utf-8").strip()


def lit(value):
    if value is None:
        return "NULL"
    return "N'" + str(value).replace("'", "''") + "'"


def build(rows, toolbar_cfg):
    parts = [
        "-- ============================================================================",
        "--  Первичное наполнение БД report: определения отчётов и панель фильтров.",
        "--  Сгенерировано из dev-БД tools/export_reports_seed.py.",
        "--  Идемпотентно: существующие записи обновляются, id сохраняются.",
        "-- ============================================================================",
        "USE report;",
        "SET NOCOUNT ON;",
        "GO",
        "",
        "SET IDENTITY_INSERT dbo.reports ON;",
        "GO",
        "",
    ]

    reports = sorted(rows, key=lambda r: (0 if r["is_section"] else 1, int(r["id"])))
    for r in reports:
        params = dict(
            key=lit(r["report_key"]),
            title=lit(r["title"]),
            icon=lit(r["icon"]),
            image=lit(r["image"]),
            q=lit(r["query_text"]),
            cfg=lit(r["config"]),
            parent="NULL" if r["parent_id"] is None else str(int(r["parent_id"])),
            sec=1 if r["is_section"] else 0,
            sort=int(r["sort_order"]),
            rid=int(r["id"]),
        )
        parts.append(
            "IF EXISTS (SELECT 1 FROM dbo.reports WHERE report_key = {key})\n"
            "    UPDATE dbo.reports SET title = {title}, icon = {icon}, image = {image},\n"
            "        query_text = {q}, config = {cfg}, parent_id = {parent}, is_section = {sec},\n"
            "        sort_order = {sort}, is_deleted = 0, updated_at = SYSUTCDATETIME()\n"
            "    WHERE report_key = {key}\n"
            "ELSE\n"
            "    INSERT INTO dbo.reports (id, report_key, title, icon, image, query_text, config,\n"
            "        parent_id, is_section, sort_order)\n"
            "    VALUES ({rid}, {key}, {title}, {icon}, {image}, {q}, {cfg}, {parent}, {sec}, {sort});\n"
            "GO".format(**params)
        )

    parts += ["SET IDENTITY_INSERT dbo.reports OFF;", "GO", ""]

    if toolbar_cfg:
        parts.append(
            "MERGE dbo.ui_config AS target\n"
            "USING (SELECT N'toolbar' AS setting_key, CAST({cfg} AS NVARCHAR(MAX)) AS config) AS src\n"
            "ON target.setting_key = src.setting_key\n"
            "WHEN MATCHED THEN UPDATE SET config = src.config, updated_at = SYSUTCDATETIME()\n"
            "WHEN NOT MATCHED THEN INSERT (setting_key, config) VALUES (src.setting_key, src.config);\n"
            "GO\n".format(cfg=lit(toolbar_cfg)))

    parts.append(
        "SELECT report_key, LEN(query_text) AS query_len, is_section\n"
        "FROM dbo.reports ORDER BY id;\n"
        "GO\n"
    )
    return "\n".join(parts)


def main():
    rows = fetch()
    toolbar = fetch_toolbar()

    os.makedirs(OUT_DIR, exist_ok=True)
    sql_text = build(rows, toolbar)
    io.open(OUT_FILE, "w", encoding="utf-8", newline="\n").write(sql_text)

    print("записано: %s (%d символов)" % (OUT_FILE, len(sql_text)))
    for r in rows:
        print("  id=%-3d %-10s %-40s query=%d" % (
            r["id"], r["report_key"], r["title"], len(r["query_text"])))


if __name__ == "__main__":
    main()

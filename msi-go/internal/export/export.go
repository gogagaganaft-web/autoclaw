package export

import (
	"archive/zip"
	"context"
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"net/url"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"sync"
	"time"

	"github.com/xuri/excelize/v2"
)

const (
	// MaxRowsPerPart — максимальное число записей в одном CSV-файле.
	MaxRowsPerPart = 1_000_000
	// MaxRowsForExcel — при числе записей до этого значения формируется один
	// файл XLSX (внутри ZIP); больше — CSV-части по MaxRowsPerPart.
	MaxRowsForExcel = 1_000_000
	// fetchChunk — размер порции чтения строк из источника.
	fetchChunk = 50_000
)

// Part — один архив в манифесте.
type Part struct {
	Name string `json:"name"`
	URL  string `json:"url"`
	Size int64  `json:"size"`
}

// Manifest — ответ эндпоинта экспорта.
type Manifest struct {
	Format    string `json:"format"` // "xlsx" | "csv"
	Parts     []Part `json:"parts"`
	TotalRows int64  `json:"totalRows"`
}

// RowSource — постраничный источник строк отчёта.
type RowSource interface {
	// Titles — состав заголовков (первая строка файла).
	Titles() []string
	// TotalRows — общее число записей.
	TotalRows() int64
	// Fetch returns rows [offset, offset+limit).
	Fetch(ctx context.Context, offset, limit int64) ([][]interface{}, error)
}

var (
	dir string

	initOnce sync.Once
)

// defaultDir возвращает каталог выгрузок: env EXPORT_DIR, иначе рядом
// с frontend data (Windows dev: C:\xampp\htdocs\report\data\exports).
func defaultDir() string {
	if d := os.Getenv("EXPORT_DIR"); d != "" {
		return d
	}
	if runtime.GOOS == "windows" {
		return `C:\xampp\htdocs\report\data\exports`
	}
	return "/var/www/html/report/data/exports"
}

// Ensure ensures export dir exists and starts the CLEANER.
func Ensure(dirPath string) {
	dir = dirPath
	if dir == "" {
		dir = defaultDir()
	}
	if err := os.MkdirAll(dir, 0o755); err != nil {
		log.Printf("[export] cannot create dir %s: %v", dir, err)
	}
	initOnce.Do(startCleaner)
}

// StartMissingCleaner starts cleaner if directory already inited.
func startCleaner() {
	go func() {
		ttl := 4 * time.Hour
		for {
			time.Sleep(15 * time.Minute)
			now := time.Now()
			entries, err := os.ReadDir(dir)
			if err != nil {
				continue
			}
			for _, e := range entries {
				if e.IsDir() || !strings.HasSuffix(e.Name(), ".zip") {
					continue
				}
				info, err := e.Info()
				if err != nil {
					continue
				}
				if now.Sub(info.ModTime()) > ttl {
					_ = os.Remove(filepath.Join(dir, e.Name()))
				}
			}
		}
	}()
}

// unsafe name sanitization for file names (Russian/Cyrillic allowed).
func sanitize(name string) string {
	name = strings.TrimSpace(name)
	var b strings.Builder
	for _, r := range name {
		switch {
		case r >= 'a' && r <= 'z':
			b.WriteRune(r)
		case r >= 'A' && r <= 'Z':
			b.WriteRune(r)
		case r >= '0' && r <= '9':
			b.WriteRune(r)
		case r >= 0x0400 && r <= 0x04FF: // Cyrillic
			b.WriteRune(r)
		case r == ' ' || r == '_' || r == '-' || r == '.':
			b.WriteRune(r)
		default:
			b.WriteRune('_')
		}
	}
	s := strings.Trim(b.String(), " ._")
	if s == "" {
		s = "export"
	}
	if len(s) > 120 {
		s = s[:120]
	}
	return s
}

// randSuffix генерирует короткий случайный суффикс для уникальности имени.
func randSuffix() string {
	return fmt.Sprintf("%d", time.Now().UnixNano()%1_000_000_000)
}

// cellString превращает значение ячейки в строку для CSV.
func cellString(v interface{}) string {
	switch t := v.(type) {
	case nil:
		return ""
	case string:
		return t
	case []byte:
		return string(t)
	case time.Time:
		return t.Format("2006-01-02 15:04:05")
	case bool:
		if t {
			return "1"
		}
		return "0"
	default:
		return fmt.Sprintf("%v", v)
	}
}

// cellXLSX приводит значение ячейки к типу для excelize.
func cellXLSX(v interface{}) interface{} {
	switch t := v.(type) {
	case []byte:
		return string(t)
	case time.Time:
		return t.Format("2006-01-02 15:04:05")
	default:
		return v
	}
}

// Generate формирует файлы выгрузки и возвращает манифест частей.
// src — источник строк; base — имя отчёта (для имени файлов).
// progress (опционально) вызывается после каждой сформированной части:
// progress(готово, всего).
func Generate(ctx context.Context, src RowSource, base string, progress func(done, total int)) (*Manifest, error) {
	Ensure("")
	if err := ensureWritableDir(); err != nil {
		return nil, err
	}
	total := src.TotalRows()
	if total <= 0 {
		return nil, fmt.Errorf("no data to export")
	}
	baseName := sanitize(base)
	sfx := randSuffix()

	if total <= MaxRowsForExcel {
		if progress != nil {
			progress(1, 1)
		}
		name := fmt.Sprintf("%s_%s.zip", baseName, sfx)
		path := filepath.Join(dir, name)
		size, err := writeXLSXZip(ctx, src, base, path)
		if err != nil {
			return nil, err
		}
		return &Manifest{
			Format:    "xlsx",
			TotalRows: total,
			Parts:     []Part{{Name: name, URL: downloadURL(name), Size: size}},
		}, nil
	}

	// CSV-части до MaxRowsPerPart каждая — все в ОДНОМ ZIP.
	name := fmt.Sprintf("%s_%s.zip", baseName, sfx)
	path := filepath.Join(dir, name)
	totalParts := int((total + MaxRowsPerPart - 1) / MaxRowsPerPart)
	size, err := writeCSVZip(ctx, src, baseName, path, totalParts, progress)
	if err != nil {
		return nil, err
	}
	return &Manifest{
		Format:    "csv",
		TotalRows: total,
		Parts:     []Part{{Name: name, URL: downloadURL(name), Size: size}},
	}, nil
}

// downloadURL формирует URL скачивания с именем для Content-Disposition.
func downloadURL(name string) string {
	return "/api/export-download?id=" + url.QueryEscape(name) + "&filename=" + url.QueryEscape(name)
}

// ensureWritableDir проверяет, что папка выгрузок существует и доступна
// на запись (создаёт её при необходимости) — с понятной ошибкой для фронта.
func ensureWritableDir() error {
	if dir == "" {
		return fmt.Errorf("каталог выгрузок не настроен")
	}
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return fmt.Errorf("не удалось создать папку выгрузок %s: %v", dir, err)
	}
	probe := filepath.Join(dir, ".write_test")
	f, err := os.OpenFile(probe, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0o644)
	if err != nil {
		return fmt.Errorf("нет прав записи в папку выгрузок %s: %v", dir, err)
	}
	_ = f.Close()
	_ = os.Remove(probe)
	return nil
}

// writeXLSXZip строит xlsx из источника и упаковывает в zip одним файлом.
func writeXLSXZip(ctx context.Context, src RowSource, name, zipPath string) (int64, error) {
	file, err := os.Create(zipPath)
	if err != nil {
		return 0, err
	}
	defer func() {
		_ = file.Close()
		if err != nil {
			_ = os.Remove(zipPath)
		}
	}()

	zw := zip.NewWriter(file)
	defer zw.Close()
	entry, err := zw.CreateHeader(&zip.FileHeader{
		Name:   strings.TrimSuffix(filepath.Base(zipPath), ".zip") + ".xlsx",
		Method: zip.Deflate,
	})
	if err != nil {
		return 0, err
	}

	err = writeXLSXStream(ctx, src, name, entry)
	if err != nil {
		return 0, err
	}
	if err := zw.Close(); err != nil {
		return 0, err
	}
	if err := file.Sync(); err != nil {
		return 0, err
	}
	info, err := file.Stat()
	if err != nil {
		return 0, err
	}
	return info.Size(), nil
}

// isNumberCell определяет, является ли сырое значение ячейки числом
// (для выбора числового формата без группировки тысяч).
func isNumberCell(v interface{}) bool {
	switch v.(type) {
	case float32, float64, int, int8, int16, int32, int64, uint, uint8, uint16, uint32, uint64:
		return true
	}
	return false
}

// writeXLSXStream пишет xlsx в поток w: заголовок отчёта, шапка,
// данные с чередованием строк и подвал — как в клиентской выгрузке.
func writeXLSXStream(ctx context.Context, src RowSource, name string, w io.Writer) error {
	f := excelize.NewFile()
	sheet := "Data"
	f.SetSheetName("Sheet1", sheet)
	sw, err := f.NewStreamWriter(sheet)
	if err != nil {
		return err
	}

	titles := src.Titles()
	nCols := len(titles)
	if nCols == 0 {
		nCols = 1
	}
	lastColName, _ := excelize.CoordinatesToCellName(nCols, 1)

	border := []excelize.Border{
		{Style: 1, Color: "000000", Type: "left"},
		{Style: 1, Color: "000000", Type: "right"},
		{Style: 1, Color: "000000", Type: "top"},
		{Style: 1, Color: "000000", Type: "bottom"},
	}
	titleStyle, _ := f.NewStyle(&excelize.Style{
		Font:      &excelize.Font{Bold: true, Size: 14},
		Alignment: &excelize.Alignment{Horizontal: "center", Vertical: "center"},
	})
	headerStyle, _ := f.NewStyle(&excelize.Style{
		Font:      &excelize.Font{Bold: true},
		Alignment: &excelize.Alignment{Horizontal: "center", Vertical: "center", WrapText: true},
		Border:    border,
	})
	zebraEven, _ := f.NewStyle(&excelize.Style{
		Border: border,
	})
	zebraOdd, _ := f.NewStyle(&excelize.Style{
		Border: border,
	})
	// NumFmt 2 — встроенный формат "0.00" (без группировки тысяч,
	// чтобы в русской локали Excel не появлялся неразрывный пробел).
	numEven, _ := f.NewStyle(&excelize.Style{
		NumFmt: 2,
		Border: border,
	})
	numOdd, _ := f.NewStyle(&excelize.Style{
		NumFmt: 2,
		Border: border,
	})
	footerStyle, _ := f.NewStyle(&excelize.Style{
		Font: &excelize.Font{Italic: true, Size: 8},
	})

	title := name
	if title == "" {
		title = "Отчет"
	}

	// Строка 1: заголовок отчёта.
	if err := sw.MergeCell("A1", lastColName); err != nil {
		return err
	}
	if err := sw.SetRow("A1", []interface{}{excelize.Cell{StyleID: titleStyle, Value: title}}); err != nil {
		return err
	}

	// Строка 2: шапка.
	headers := make([]interface{}, nCols)
	for i := range titles {
		headers[i] = excelize.Cell{StyleID: headerStyle, Value: titles[i]}
	}
	if err := sw.SetRow("A2", headers); err != nil {
		return err
	}

	// Данные с 3-й строки: чередование цветов, границы, формат чисел.
	rowIdx := 3
	offset := int64(0)
	total := src.TotalRows()
	for offset < total {
		rows, err := src.Fetch(ctx, offset, fetchChunk)
		if err != nil {
			return err
		}
		if len(rows) == 0 {
			break
		}
		for _, r := range rows {
			cells := make([]interface{}, nCols)
			for i := 0; i < nCols; i++ {
				var raw interface{}
				if i < len(r) {
					raw = r[i]
				}
				value := cellXLSX(raw)
				if isNumberCell(raw) {
					if rowIdx%2 == 0 {
						cells[i] = excelize.Cell{StyleID: numEven, Value: value}
					} else {
						cells[i] = excelize.Cell{StyleID: numOdd, Value: value}
					}
				} else if rowIdx%2 == 0 {
					cells[i] = excelize.Cell{StyleID: zebraEven, Value: value}
				} else {
					cells[i] = excelize.Cell{StyleID: zebraOdd, Value: value}
				}
			}
			cell, err := excelize.CoordinatesToCellName(1, rowIdx)
			if err != nil {
				return err
			}
			if err := sw.SetRow(cell, cells); err != nil {
				return err
			}
			rowIdx++
		}
		offset += int64(len(rows))
	}

	// Подвал: имя отчёта и дата выгрузки.
	footerCell, _ := excelize.CoordinatesToCellName(1, rowIdx)
	footerEnd, _ := excelize.CoordinatesToCellName(nCols, rowIdx)
	if err := sw.MergeCell(footerCell, footerEnd); err != nil {
		return err
	}
	footer := title + " - " + time.Now().Format("02.01.2006, 15:04:05")
	if err := sw.SetRow(footerCell, []interface{}{excelize.Cell{StyleID: footerStyle, Value: footer}}); err != nil {
		return err
	}

	if err := sw.Flush(); err != nil {
		return err
	}
	_, err = f.WriteTo(w)
	return err
}

// writeCSVPart пишет CSV-файл (до maxRows строк) и упаковывает его в zip.
func writeCSVPart(ctx context.Context, src RowSource, offset, maxRows int64, zipPath string) (int64, error) {
	file, err := os.Create(zipPath)
	if err != nil {
		return 0, err
	}
	defer func() {
		_ = file.Close()
		if err != nil {
			_ = os.Remove(zipPath)
		}
	}()

	zw := zip.NewWriter(file)
	entry, err := zw.CreateHeader(&zip.FileHeader{
		Name:   strings.TrimSuffix(filepath.Base(zipPath), ".zip") + ".csv",
		Method: zip.Deflate,
	})
	if err != nil {
		return 0, err
	}

	cw := csv.NewWriter(entry)
	titles := src.Titles()
	if err := cw.Write(titles); err != nil {
		return 0, err
	}

	written := int64(0)
	off := offset
	for written < maxRows {
		limit := int64(fetchChunk)
		if maxRows-written < limit {
			limit = maxRows - written
		}
		rows, err := src.Fetch(ctx, off, limit)
		if err != nil {
			return 0, err
		}
		if len(rows) == 0 {
			break
		}
		for _, r := range rows {
			rec := make([]string, len(titles))
			for i := range titles {
				if i < len(r) {
					rec[i] = cellString(r[i])
				} else {
					rec[i] = ""
				}
			}
			if err := cw.Write(rec); err != nil {
				return 0, err
			}
		}
		written += int64(len(rows))
		off += int64(len(rows))
	}
	cw.Flush()
	if err := cw.Error(); err != nil {
		return 0, err
	}
	if err := zw.Close(); err != nil {
		return 0, err
	}
	if err := file.Sync(); err != nil {
		return 0, err
	}
	info, err := file.Stat()
	if err != nil {
		return 0, err
	}
	return info.Size(), nil
}

// writeCSVZip пишет все CSV-части (по MaxRowsPerPart строк каждая) в ОДИН
// ZIP-архив: <base>_part1.csv, <base>_part2.csv, ...
func writeCSVZip(ctx context.Context, src RowSource, base string, zipPath string, totalParts int, progress func(done, total int)) (int64, error) {
	file, err := os.Create(zipPath)
	if err != nil {
		return 0, err
	}
	defer func() {
		_ = file.Close()
		if err != nil {
			_ = os.Remove(zipPath)
		}
	}()

	zw := zip.NewWriter(file)
	titles := src.Titles()

	offset := int64(0)
	for part := 1; part <= totalParts; part++ {
		entry, err := zw.CreateHeader(&zip.FileHeader{
			Name:   fmt.Sprintf("%s_part%d.csv", base, part),
			Method: zip.Deflate,
		})
		if err != nil {
			return 0, err
		}
		cw := csv.NewWriter(entry)
		if err := cw.Write(titles); err != nil {
			return 0, err
		}

		written := int64(0)
		for written < MaxRowsPerPart {
			limit := int64(fetchChunk)
			if MaxRowsPerPart-written < limit {
				limit = MaxRowsPerPart - written
			}
			rows, err := src.Fetch(ctx, offset, limit)
			if err != nil {
				return 0, err
			}
			if len(rows) == 0 {
				break
			}
			for _, r := range rows {
				rec := make([]string, len(titles))
				for i := range titles {
					if i < len(r) {
						rec[i] = cellString(r[i])
					} else {
						rec[i] = ""
					}
				}
				if err := cw.Write(rec); err != nil {
					return 0, err
				}
			}
			written += int64(len(rows))
			offset += int64(len(rows))
		}
		cw.Flush()
		if err := cw.Error(); err != nil {
			return 0, err
		}
		if progress != nil {
			progress(part, totalParts)
		}
	}

	if err := zw.Close(); err != nil {
		return 0, err
	}
	if err := file.Sync(); err != nil {
		return 0, err
	}
	info, err := file.Stat()
	if err != nil {
		return 0, err
	}
	return info.Size(), nil
}

// DownloadPath возвращает абсолютный путь к готовому архиву по имени файла
// (name — только имя, без путей; допустимы только *.zip).
func DownloadPath(name string) (string, bool) {
	if dir == "" {
		return "", false
	}
	base := filepath.Base(name)
	if base == "" || base != name {
		return "", false
	}
	if !strings.HasSuffix(strings.ToLower(base), ".zip") {
		return "", false
	}
	p := filepath.Join(dir, base)
	if _, err := os.Stat(p); err != nil {
		return "", false
	}
	return p, true
}
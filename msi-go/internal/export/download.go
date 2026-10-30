package export

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
)

// DownloadHandler — http.HandlerFunc для GET /api/export-download?id=<file>.
// Валидирует имя (только базовое имя *.zip), отдаёт файл с
// Content-Disposition attachment; filename*=UTF-8.
func DownloadHandler(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("id")
	if name == "" {
		http.Error(w, `{"error":"id is required"}`, http.StatusBadRequest)
		return
	}
	path, ok := DownloadPath(name)
	if !ok {
		http.Error(w, `{"error":"file not found"}`, http.StatusNotFound)
		return
	}

	// Content-Disposition: attachment; filename="<name>.zip"; filename*=UTF-8''...
	base := filepath.Base(name)
	ascii := sanitize(base)
	if ascii == "" {
		ascii = "export.zip"
	}
	enc := r.URL.Query().Get("filename")
	disp := fmt.Sprintf("attachment; filename=\"%s\"", ascii)
	if enc != "" {
		disp += fmt.Sprintf("; filename*=UTF-8''%s", enc)
	}

	w.Header().Set("Content-Type", "application/zip")
	w.Header().Set("Content-Disposition", disp)

	f, err := os.Open(path)
	if err != nil {
		http.Error(w, `{"error":"file not found"}`, http.StatusNotFound)
		return
	}
	defer f.Close()
	info, err := f.Stat()
	if err != nil {
		http.Error(w, `{"error":"file stat error"}`, http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Length", fmt.Sprintf("%d", info.Size()))
	http.ServeContent(w, r, base, info.ModTime(), f)
}
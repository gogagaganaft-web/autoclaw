//go:build !windows

package service

import (
	"net/http"
)

func Install(cfg Config) error {
	// Not supported on Linux — use systemd
	return nil
}

func Remove(name string) error {
	// Not supported on Linux — use systemd
	return nil
}

func Run(name string, server *http.Server) {
	select {}
}

func ShouldRunAsService() bool {
	return false
}

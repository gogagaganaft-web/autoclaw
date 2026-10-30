//go:build windows

package service

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"golang.org/x/sys/windows/svc"
	"golang.org/x/sys/windows/svc/eventlog"
	"golang.org/x/sys/windows/svc/mgr"
)

type winService struct {
	name   string
	server *http.Server
}

func (s *winService) Execute(args []string, r <-chan svc.ChangeRequest, changes chan<- svc.Status) (bool, uint32) {
	const cmdsAccepted = svc.AcceptStop | svc.AcceptShutdown

	elog, err := eventlog.Open(s.name)
	if err != nil {
		return true, 1
	}
	defer elog.Close()

	changes <- svc.Status{State: svc.Running, Accepts: cmdsAccepted}
	elog.Info(1, fmt.Sprintf("%s service started", s.name))

loop:
	for {
		select {
		case c := <-r:
			switch c.Cmd {
			case svc.Interrogate:
				changes <- c.CurrentStatus
			case svc.Stop, svc.Shutdown:
				elog.Info(1, fmt.Sprintf("%s service stopping", s.name))
				ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
				defer cancel()
				if s.server != nil {
					s.server.Shutdown(ctx)
				}
				changes <- svc.Status{State: svc.StopPending}
				break loop
			default:
				continue
			}
		}
	}

	changes <- svc.Status{State: svc.Stopped}
	return false, 0
}

func Run(name string, server *http.Server) {
	elog, err := eventlog.Open(name)
	if err != nil {
		log.Fatalf("Failed to open event log: %v", err)
	}
	defer elog.Close()

	elog.Info(1, fmt.Sprintf("Starting %s", name))

	err = svc.Run(name, &winService{name: name, server: server})
	if err != nil {
		elog.Error(1, fmt.Sprintf("%s service failed: %v", name, err))
		log.Fatalf("Service run failed: %v", err)
	}
}

func Install(cfg Config) error {
	m, err := mgr.Connect()
	if err != nil {
		return fmt.Errorf("connecting to service manager: %w", err)
	}
	defer m.Disconnect()

	exePath, err := os.Executable()
	if err != nil {
		return fmt.Errorf("getting executable path: %w", err)
	}

	old, _ := m.OpenService(cfg.Name)
	if old != nil {
		old.Delete()
		old.Close()
		eventlog.Remove(cfg.Name)
		time.Sleep(2 * time.Second)
	}

	var s *mgr.Service
	for attempt := 0; attempt < 10; attempt++ {
		s, err = m.CreateService(cfg.Name, exePath, mgr.Config{
			DisplayName:      cfg.DisplayName,
			Description:      cfg.Description,
			StartType:        mgr.StartAutomatic,
			DelayedAutoStart: true,
		})
		if err == nil {
			break
		}
		if attempt < 9 {
			fmt.Printf("  Retrying in 2s (attempt %d/10)...\n", attempt+1)
			time.Sleep(2 * time.Second)
		}
	}
	if err != nil {
		return fmt.Errorf("creating service: %w", err)
	}
	defer s.Close()

	err = eventlog.InstallAsEventCreate(cfg.Name, eventlog.Error|eventlog.Warning|eventlog.Info)
	if err != nil {
		s.Delete()
		return fmt.Errorf("installing event log source: %w", err)
	}

	return nil
}

func Remove(name string) error {
	m, err := mgr.Connect()
	if err != nil {
		return fmt.Errorf("connecting to service manager: %w", err)
	}
	defer m.Disconnect()

	s, err := m.OpenService(name)
	if err != nil {
		return fmt.Errorf("opening service: %w", err)
	}
	defer s.Close()

	err = s.Delete()
	if err != nil {
		return fmt.Errorf("deleting service: %w", err)
	}

	err = eventlog.Remove(name)
	if err != nil {
		return fmt.Errorf("removing event log source: %w", err)
	}

	return nil
}

func ShouldRunAsService() bool {
	isService, err := svc.IsWindowsService()
	return err == nil && isService
}

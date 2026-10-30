//go:build linux

package meminfo

import (
	"os"
	"strconv"
	"strings"
)

// RSSMB returns the resident set size of the current process in megabytes
// (from /proc/self/status, VmRSS in kB).
func RSSMB() float64 {
	data, err := os.ReadFile("/proc/self/status")
	if err != nil {
		return heapAllocMB()
	}
	for _, line := range strings.Split(string(data), "\n") {
		if strings.HasPrefix(line, "VmRSS:") {
			fields := strings.Fields(line)
			if len(fields) >= 2 {
				if kb, err := strconv.ParseFloat(fields[1], 64); err == nil {
					return kb / 1024
				}
			}
			break
		}
	}
	return heapAllocMB()
}

// TotalMB returns the total physical memory of the host in megabytes
// (from /proc/meminfo, MemTotal in kB).
func TotalMB() uint64 {
	data, err := os.ReadFile("/proc/meminfo")
	if err != nil {
		return 0
	}
	for _, line := range strings.Split(string(data), "\n") {
		if strings.HasPrefix(line, "MemTotal:") {
			fields := strings.Fields(line)
			if len(fields) >= 2 {
				if kb, err := strconv.ParseUint(fields[1], 10, 64); err == nil {
					return kb / 1024
				}
			}
			break
		}
	}
	return 0
}

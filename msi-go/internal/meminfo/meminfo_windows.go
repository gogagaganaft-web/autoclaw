//go:build windows

package meminfo

import (
	"syscall"
	"unsafe"
)

var (
	kernel32 = syscall.NewLazyDLL("kernel32.dll")
	psapi    = syscall.NewLazyDLL("psapi.dll")

	procGetProcessMemoryInfo = psapi.NewProc("GetProcessMemoryInfo")
	procGlobalMemoryStatusEx = kernel32.NewProc("GlobalMemoryStatusEx")
)

type processMemoryCounters struct {
	CB                         uint32
	PageFaultCount             uint32
	PeakWorkingSetSize         uintptr
	WorkingSetSize             uintptr
	QuotaPeakPagedPoolUsage    uintptr
	QuotaPagedPoolUsage        uintptr
	QuotaPeakNonPagedPoolUsage uintptr
	QuotaNonPagedPoolUsage     uintptr
	PagefileUsage              uintptr
	PeakPagefileUsage          uintptr
}

type memoryStatusEx struct {
	CB                  uint32
	MemoryLoad          uint32
	TotalPhys           uint64
	AvailPhys           uint64
	TotalPageFile       uint64
	AvailPageFile       uint64
	TotalVirtual        uint64
	AvailVirtual        uint64
	AvailExtendedVirtual uint64
}

// RSSMB returns the working set size of the current process in megabytes.
func RSSMB() float64 {
	process, err := syscall.GetCurrentProcess()
	if err != nil {
		return heapAllocMB()
	}
	var pmc processMemoryCounters
	pmc.CB = uint32(unsafe.Sizeof(pmc))
	r1, _, _ := procGetProcessMemoryInfo.Call(
		uintptr(process),
		uintptr(unsafe.Pointer(&pmc)),
		uintptr(pmc.CB),
	)
	if r1 == 0 {
		return heapAllocMB()
	}
	return float64(pmc.WorkingSetSize) / (1024 * 1024)
}

// TotalMB returns the total physical memory of the host in megabytes.
func TotalMB() uint64 {
	var ms memoryStatusEx
	ms.CB = uint32(unsafe.Sizeof(ms))
	r1, _, _ := procGlobalMemoryStatusEx.Call(uintptr(unsafe.Pointer(&ms)))
	if r1 == 0 {
		return 0
	}
	return ms.TotalPhys / (1024 * 1024)
}

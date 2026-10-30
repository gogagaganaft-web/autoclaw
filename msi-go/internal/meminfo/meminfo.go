// Package meminfo reports current memory usage of the process
// and the total physical memory of the host.
package meminfo

import "runtime"

// Percent returns the share of the process memory in total memory (0..100).
func Percent(rssMB float64, totalMB uint64) float64 {
	if totalMB == 0 {
		return 0
	}
	return rssMB / float64(totalMB) * 100
}

func heapAllocMB() float64 {
	var ms runtime.MemStats
	runtime.ReadMemStats(&ms)
	return float64(ms.HeapAlloc) / (1024 * 1024)
}

package main

import (
	"fmt"
	"os"
	"time"
)

func main() {
	start := time.Now()

	file, err := os.Create("text-go.txt")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	for i := 0; i < 1000000; i++ {
		fmt.Fprintf(file, " %d ", i)
	}

	fmt.Printf("Elapsed time: %s", time.Since(start))
}

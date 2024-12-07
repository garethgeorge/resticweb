package syncapi

import (
	"fmt"
	"os"
	"path/filepath"
	"testing"
)

func TestIdentity(t *testing.T) {
	dir := t.TempDir()

	// Create a new identity
	ident, err := NewIdentity("test-instance", filepath.Join(dir, "myidentity.pem"))
	if err != nil {
		t.Fatalf("failed to create identity: %v", err)
	}

	signed, err := ident.SignMessage([]byte("hello world!"))
	fmt.Println("signed message: %x", signed)

	// Load and print identity file
	bytes, _ := os.ReadFile(filepath.Join(dir, "myidentity.pem"))
	t.Log(string(bytes))

	// Load and print public key file
	bytes, _ = os.ReadFile(filepath.Join(dir, "myidentity.pem.pub"))
	t.Log(string(bytes))

	t.Fatal("test failed")
}

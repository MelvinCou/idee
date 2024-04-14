#!/bin/bash

# Exit the script if an error occurs
set -e

# Execute unit tests
echo "Execution of unit tests"
go test -v ./test/unit

# Execute integration tests
echo "Execution of integration tests"
go test -v ./test/integration

echo "Tests end"

#!/bin/bash

# Exécution des tests unitaires
echo "Execution of unit tests"
go test -v ./test/unit

# Exécution des tests d'intégration
echo "Execution of integration tests"
go test -v ./test/integration

echo "Tests end"

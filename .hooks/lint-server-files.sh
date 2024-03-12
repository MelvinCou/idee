#!/usr/bin/env bash

set -euo pipefail

pushd .
cd server
golangci-lint run --new-from-rev HEAD --fix
popd

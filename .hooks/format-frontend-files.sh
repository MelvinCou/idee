#!/usr/bin/env bash

set -euo pipefail

pushd .
cd front
npm format
popd

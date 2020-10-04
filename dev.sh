#!/bin/bash

if [ ! -d "public" ]; then
    echo "making public"
    mkdir -p public
    echo "running initial build"
    brunch build
fi
brunch watch --server --port 3000
#!/bin/sh

echo "Updating git submodules"
git submodule update --init --recursive

echo "Creating static folders"

echo "Initing the new git project..."
git init
git add .
git commit -m"Initial Commit"
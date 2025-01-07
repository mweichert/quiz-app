#!/bin/bash

[ $# -ne 1 ] || [ ! -f "$1" ] && { echo "Usage: $0 <zip-file>" >&2; exit 1; }

TEMP_DIR=$(mktemp -d)
trap 'rm -rf "$TEMP_DIR"' EXIT

unzip -q "$1" -d "$TEMP_DIR" || { echo "Error: Failed to extract zip file" >&2; exit 1; }
[ ! -d "$TEMP_DIR/project" ] && { echo "Error: No project directory in zip" >&2; exit 1; }

cd "$TEMP_DIR/project"
for f in * .[!.]*; do
    [ -e "$f" ] && \
    { [ -e "$OLDPWD/$f" ] && echo "Skipping existing: $f" || mv "$f" "$OLDPWD/"; }
done

echo "✓ Project extracted successfully" 
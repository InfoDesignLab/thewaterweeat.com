#!/bin/sh

mkdir -p build
rm -rf build/*
cp -r src/* build
if [ "$1" == "stealth" ]; then
  echo "User-agent: *\nDisallow: /" > build/robots.txt
fi

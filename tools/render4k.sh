#!/usr/bin/env bash
cd "B:/ai-history-video"
segments=(
  "0 1741 s1"
  "1742 3483 s2"
  "3484 5225 s3"
  "5226 6967 s4"
  "6968 8709 s5"
  "8710 10451 s6"
  "10452 12193 s7"
  "12194 13934 s8"
)
for seg in "${segments[@]}"; do
  set -- $seg
  a=$1; b=$2; name=$3
  if [ -s "out/4k-v3/$name.mp4" ]; then echo "SKIP $name"; continue; fi
  powershell -NoProfile -Command "Stop-Process -Name chrome-headless-shell -Force -ErrorAction SilentlyContinue" 2>/dev/null
  echo "=== render $name ($a-$b) ==="
  npx remotion render Film "out/4k-v3/$name.mp4" --frames=$a-$b --scale=2 --concurrency=4 --log=error 2>&1 | tail -2
  ls -la "out/4k-v3/$name.mp4" 2>/dev/null || echo "FAILED $name"
done
echo "ALL SEGMENTS DONE"
ls -la out/4k-v3/

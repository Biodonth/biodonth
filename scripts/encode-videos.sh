#!/usr/bin/env bash
# Encode Biodonth landing-page videos to web-ready MP4 and extract posters.
# Requirements: ffmpeg in PATH
# Usage: bash scripts/encode-videos.sh [SOURCE_DIR]
#   SOURCE_DIR defaults to the Windows Downloads path below.

set -euo pipefail

SRC="${1:-C:/Users/Dell/Downloads/Biodonth Trafego/Videos/TRAFEGO OUTUBRO_}"
OUT="$(dirname "$0")/../public/videos"
POSTERS="$OUT/posters"

mkdir -p "$OUT" "$POSTERS"

declare -A MAP=(
  ["ROTEIRO 01.MOV"]="v01-implante-doi"
  ["ROTEIRO 04.MOV"]="v04-orcamento"
  ["ROTEIRO 05.MOV"]="v05-etapas"
  ["ROTEIRO 06.MOV"]="v06-pouco-osso"
  ["ROTEIRO 07.MOV"]="v07-planejamento"
)

for FNAME in "${!MAP[@]}"; do
  NAME="${MAP[$FNAME]}"
  INPUT="$SRC/$FNAME"

  if [[ ! -f "$INPUT" ]]; then
    echo "⚠  Missing: $INPUT — skipping $NAME"
    continue
  fi

  echo "▶  Encoding $NAME …"

  # MP4: H.264, 720×1280 vertical, crf 28, AAC 96k, faststart
  ffmpeg -y -i "$INPUT" \
    -vf "scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2:color=black" \
    -c:v libx264 -crf 28 -preset veryfast \
    -c:a aac -b:a 96k \
    -movflags +faststart \
    "$OUT/${NAME}.mp4"

  # Poster: single frame at ~1 s, JPG quality 80
  ffmpeg -y -i "$INPUT" \
    -ss 00:00:01 -vframes 1 \
    -vf "scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2:color=black" \
    -q:v 5 \
    "$POSTERS/${NAME}.jpg"

  SIZE=$(du -sh "$OUT/${NAME}.mp4" | cut -f1)
  echo "   ✓ ${NAME}.mp4  ($SIZE)"
done

echo ""
echo "Done. Files in $OUT"

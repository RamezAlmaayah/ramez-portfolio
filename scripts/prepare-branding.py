"""Prepare the supplied monogram deterministically; never redraw its geometry."""
import argparse
import base64
import hashlib
import io
import json
from pathlib import Path
from PIL import Image

parser = argparse.ArgumentParser()
parser.add_argument('source', type=Path)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
out = root / 'public' / 'branding'
out.mkdir(exist_ok=True)
source = Image.open(args.source).convert('RGBA')
# Ignore alpha <8 (invisible export speckles) when finding the visible bounds.
# Keep a two-pixel antialiasing margin and preserve every pixel inside the crop.
bounds = source.getchannel('A').point(lambda a: 255 if a >= 8 else 0).getbbox()
assert bounds is not None
left, top, right, bottom = bounds
crop = (max(0, left - 2), max(0, top - 2), min(source.width, right + 2), min(source.height, bottom + 2))
original = source.crop(crop)
original.save(out / 'ra-logo.png', optimize=True)
light = original.copy()
pixels = light.load()
for y in range(light.height):
    for x in range(light.width):
        r, g, b, alpha = pixels[x, y]
        if alpha:
            # Distinguish the existing grey crossbar from the navy monogram.
            color = (168, 190, 201) if r >= 60 and g >= 70 else (245, 247, 248)
            pixels[x, y] = (*color, alpha)
assert original.getchannel('A').tobytes() == light.getchannel('A').tobytes()
light.save(out / 'ra-logo-light.png', optimize=True)

def icon(size):
    canvas = Image.new('RGBA', (size, size), '#f5f7f8')
    mark = original.copy()
    mark.thumbnail((size if size <= 32 else size - 24, size if size <= 32 else size - 24), Image.Resampling.LANCZOS)
    canvas.alpha_composite(mark, ((size - mark.width) // 2, (size - mark.height) // 2))
    return canvas

for size in (16, 32, 180):
    icon(size).save(out / f'favicon-{size}.png', optimize=True)
icon(180).save(out / 'apple-touch-icon.png', optimize=True)
icon(64).save(root / 'public' / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
buffer = io.BytesIO()
icon(64).save(buffer, format='PNG')
encoded = base64.b64encode(buffer.getvalue()).decode('ascii')
(root / 'public' / 'favicon.svg').write_text(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>RA monogram</title>'
    f'<image width="64" height="64" href="data:image/png;base64,{encoded}"/></svg>\n', encoding='utf-8')
manifest = {
    'sourceName': args.source.name,
    'sourceSha256': hashlib.sha256(args.source.read_bytes()).hexdigest(),
    'sourceSize': list(source.size), 'crop': list(crop), 'outputSize': list(original.size),
    'alphaSha256': hashlib.sha256(original.getchannel('A').tobytes()).hexdigest(),
    'lightVariantHasIdenticalAlpha': True,
    'method': 'Crop original pixels with 2px edge margin; recolor RGB only for the light variant. No tracing, redrawing, or generative editing.',
}
(out / 'source.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
print(json.dumps(manifest, ensure_ascii=True))

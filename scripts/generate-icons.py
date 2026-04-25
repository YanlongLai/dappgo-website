"""Generate PWA icons (blue rounded square with white "D") at 192x192 and 512x512."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


BRAND_BLUE = (37, 99, 235)  # #2563eb
WHITE = (255, 255, 255)
SIZES = (192, 512)
OUT_DIR = Path(__file__).resolve().parent.parent / "icons"


def _find_bold_font(target_px: int) -> ImageFont.FreeTypeFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Avenir Next.ttc",
        "/Library/Fonts/Arial Bold.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            try:
                return ImageFont.truetype(path, target_px)
            except OSError:
                continue
    return ImageFont.load_default()


def generate(size: int) -> None:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Rounded square background with a corner radius proportional to the size.
    radius = int(size * 0.22)
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=BRAND_BLUE)

    # Draw the "D" centered.
    font = _find_bold_font(int(size * 0.68))
    text = "D"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    # textbbox accounts for ascent/descent — shift by -bbox[0]/-bbox[1] to align.
    x = (size - text_w) / 2 - bbox[0]
    y = (size - text_h) / 2 - bbox[1]
    draw.text((x, y), text, fill=WHITE, font=font)

    out_path = OUT_DIR / f"icon-{size}.png"
    img.save(out_path, format="PNG")
    print(f"wrote {out_path}")


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for size in SIZES:
        generate(size)


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Render DappGo brand assets (logo W4 "Pulse link", banner B1) with headless Chrome.

Owner-approved 2026-11-26. English uses the navy lockup (W4D, Manrope 800), Traditional Chinese the
white one (W4A, Inter 800). Same geometry as the social-profile masters, so the site and the social
accounts match. Standard library only; needs Google Chrome and macOS `sips`.

    python3 scripts/build-brand-assets.py

Writes: favicon.svg, favicon.ico, icons/icon-{192,512}.png, og-brand-{en,zh}.png, og-options.png and the
legacy share-image names og-image.png / og-image-v2.png (older posts still point at them).
"""
import base64
import pathlib
import struct
import subprocess
import tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
NAVY, AMBER = "#0F1B3D", "#E8A33D"
PULSE_POINTS = "4,32 56,32 74,10 96,52 118,4 136,32 196,32"
PULSE = (f'<polyline points="{PULSE_POINTS}" fill="none" stroke="{AMBER}" stroke-width="9" '
         'stroke-linecap="round" stroke-linejoin="round"/>')


def font(path):
    # Inlined: Chrome refuses file:// fonts that live outside the page's own directory.
    return "data:font/woff2;base64," + base64.b64encode((ROOT / path).read_bytes()).decode()


FONTS = f"""
@font-face {{ font-family: "Manrope"; src: url("{font('assets/home/fonts/manrope-var-latin.woff2')}"); font-weight: 500 800; }}
@font-face {{ font-family: "Inter"; src: url("{font('fonts/Inter-Regular.woff2')}"); font-weight: 400 500; }}
@font-face {{ font-family: "Inter"; src: url("{font('fonts/Inter-SemiBold.woff2')}"); font-weight: 600 700; }}
@font-face {{ font-family: "Inter"; src: url("{font('fonts/Inter-ExtraBold.woff2')}"); font-weight: 800; }}
"""
LANG = {
    "en": dict(bg=NAVY, ink="#FFFFFF", sub="#B8C0D4", line="rgba(255,255,255,0.18)", logo="Manrope",
               body="Inter", tag="Your daily market brief.", markets="US stocks · Taiwan stocks · Options"),
    "zh": dict(bg="#FFFFFF", ink=NAVY, sub="#4A5368", line="#E4E0D8", logo="Inter",
               body="Inter, 'PingFang TC', 'Noto Sans TC'", tag="每天 5 分鐘，看懂市場。", markets="台股・美股・選擇權"),
}
OPTIONS = dict(LANG["en"], tag="Options Explorer", markets="Valuation ranges · Options chains · Scored setups")


def logo(L, px):
    """Stacked W4 lockup: Dapp / pulse / Go."""
    return (f'<span style="display:inline-flex;flex-direction:column;align-items:center;line-height:.92;font-weight:800;'
            f'letter-spacing:-0.01em;font-family:{L["logo"]};color:{L["ink"]};font-size:{px}px"><span>Dapp</span>'
            f'<svg viewBox="0 0 200 60" style="width:2.2em;height:.62em;margin:.04em 0">{PULSE}</svg><span>Go</span></span>')


def page(w, h, bg, body):
    return (f'<!doctype html><html><head><meta charset="utf-8"><style>{FONTS}html,body{{margin:0;width:{w}px;height:{h}px;'
            f'background:{bg};overflow:hidden}}</style></head><body>{body}</body></html>')


def avatar(L, size):
    return page(size, size, L["bg"], f'<div style="width:{size}px;height:{size}px;display:flex;align-items:center;'
                                     f'justify-content:center">{logo(L, size * 0.2)}</div>')


def banner(L, w, h, s):
    """Banner B1: logo, thin divider, one tagline and a markets line, centred."""
    return page(w, h, L["bg"], f'''<div style="width:{w}px;height:{h}px;display:flex;align-items:center;justify-content:center;gap:{40 * s}px">
{logo(L, 46 * s)}<span style="width:{2 * s}px;height:{120 * s}px;background:{L["line"]}"></span>
<span style="display:flex;flex-direction:column;gap:{10 * s}px;font-family:{L["body"]}">
<span style="font-weight:700;font-size:{32 * s}px;line-height:1.2;color:{L["ink"]}">{L["tag"]}</span>
<span style="font-weight:500;font-size:{17 * s}px;line-height:1.4;color:{L["sub"]}">{L["markets"]}</span></span></div>''')


# Small sizes cannot carry the wordmark, so the favicon is the pulse alone on a navy tile.
FAVICON_SVG = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-labelledby="title">
  <title id="title">DappGo</title>
  <rect width="64" height="64" rx="14" fill="{NAVY}"/>
  <g transform="translate(6 24.7) scale(.26)"><polyline points="{PULSE_POINTS}" fill="none" stroke="{AMBER}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></g>
</svg>
'''


def shot(html, w, h, out, transparent=False):
    with tempfile.TemporaryDirectory() as tmp:
        src = pathlib.Path(tmp) / "page.html"
        src.write_text(html, encoding="utf-8")
        args = [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
                "--virtual-time-budget=4000", f"--window-size={w},{h}", f"--screenshot={out}"]
        if transparent:
            args.append("--default-background-color=00000000")
        subprocess.run(args + [src.as_uri()], check=True, capture_output=True)
    if pathlib.Path(out).is_relative_to(ROOT):
        print("wrote", pathlib.Path(out).relative_to(ROOT))


def resized(src, size, tmp):
    out = pathlib.Path(tmp) / f"{size}.png"
    subprocess.run(["sips", "-z", str(size), str(size), str(src), "--out", str(out)], check=True, capture_output=True)
    return out.read_bytes()


def write_ico(master, out, sizes=(16, 32, 48)):
    """PNG-in-ICO container; every browser that still asks for favicon.ico reads it."""
    with tempfile.TemporaryDirectory() as tmp:
        images = [resized(master, size, tmp) for size in sizes]
    header = struct.pack("<HHH", 0, 1, len(sizes))
    offset = 6 + 16 * len(sizes)
    entries = b""
    for size, data in zip(sizes, images):
        entries += struct.pack("<BBBBHHII", size, size, 0, 0, 1, 32, len(data), offset)
        offset += len(data)
    out.write_bytes(header + entries + b"".join(images))
    print("wrote", out.relative_to(ROOT))


def main():
    (ROOT / "favicon.svg").write_text(FAVICON_SVG, encoding="utf-8")
    print("wrote favicon.svg")
    with tempfile.TemporaryDirectory() as tmp:
        master = pathlib.Path(tmp) / "favicon-512.png"
        tile = FAVICON_SVG.replace("<svg ", '<svg width="512" height="512" ')
        shot(f'<!doctype html><html><body style="margin:0;background:transparent">{tile}</body></html>', 512, 512, master, transparent=True)
        write_ico(master, ROOT / "favicon.ico")
    for size in (192, 512):
        shot(avatar(LANG["en"], size), size, size, ROOT / "icons" / f"icon-{size}.png")
    shot(banner(LANG["en"], 1200, 630, 1.5), 1200, 630, ROOT / "og-brand-en.png")
    shot(banner(LANG["zh"], 1200, 630, 1.5), 1200, 630, ROOT / "og-brand-zh.png")
    shot(banner(OPTIONS, 1200, 630, 1.5), 1200, 630, ROOT / "og-options.png")
    for legacy in ("og-image.png", "og-image-v2.png"):
        (ROOT / legacy).write_bytes((ROOT / "og-brand-en.png").read_bytes())
        print("wrote", legacy)


if __name__ == "__main__":
    main()

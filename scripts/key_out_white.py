"""Prepare Reverse Pitch logo PNGs for the white-pill treatment.

Only FOUR of the source JPGs are true dark-on-white logos; those get their
white background keyed to transparent (matte removal + unpremultiply to keep
anti-aliased edges saturated) and cropped tight, so they melt into the white
pill.

The other five are full-bleed COLORED brand tiles (e.g. white text on blue /
brown). Keying their background would erase the logo, so they are copied to
PNG as-is and sit centered inside the white pill with breathing room.
"""

import os
import numpy as np
from PIL import Image

SRC_DIR = os.path.join("public", "images", "raise-right")

# Genuine dark-on-white logos -> key out white.
KEY_WHITE = [
    ("elevate_ventures_inc__logo.jpg", "elevate_ventures_inc_logo.png"),
    ("crossroads_health_ventures_logo.jpg", "crossroads_health_ventures_logo.png"),
    ("old_national_bank_logo.jpg", "old_national_bank_logo.png"),
    ("rams_head_funding_logo.jpg", "rams_head_funding_logo.png"),
]

# Colored brand tiles -> keep background, just transcode to PNG.
PASSTHROUGH = [
    ("orangefund_logo.jpg", "orangefund_logo.png"),
    ("generationscommunitybank_logo.jpg", "generationscommunitybank_logo.png"),
    ("endeavorglobal_logo.jpg", "endeavorglobal_logo.png"),
    ("jpmorganchase_logo.jpg", "jpmorganchase_logo.png"),
    ("yorktown_fund_logo.jpg", "yorktown_fund_logo.png"),
]

WHITE = 240.0
FALLOFF = 30.0


def key_white(src_path, out_path):
    img = Image.open(src_path).convert("RGB")
    arr = np.asarray(img).astype(np.float32)
    mn = np.minimum(np.minimum(arr[..., 0], arr[..., 1]), arr[..., 2])

    # alpha: 0 at/above WHITE, ramps to 1 below. Saturated/dark pixels (low min
    # channel) stay opaque even if one channel is bright.
    alpha = np.clip((WHITE - mn) / FALLOFF, 0.0, 1.0)

    # Unpremultiply observed = a*F + (1-a)*255 to recover foreground color.
    a3 = alpha[..., None]
    safe = np.where(a3 > 0.003, a3, 1.0)
    fg = np.clip((arr - (1.0 - a3) * 255.0) / safe, 0.0, 255.0)

    rgba = Image.fromarray(
        np.dstack([fg, alpha * 255.0]).astype(np.uint8), "RGBA"
    )

    # Trim transparent margins.
    ys, xs = np.where(np.asarray(rgba)[..., 3] > 8)
    if len(xs):
        rgba = rgba.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
    rgba.save(out_path, "PNG")

    a = np.asarray(rgba)[..., 3]
    print(
        f"KEYED   {os.path.basename(out_path):42s} {rgba.width}x{rgba.height} "
        f"transparent={(a < 5).mean():5.1%}"
    )


def passthrough(src_path, out_path):
    img = Image.open(src_path).convert("RGB")
    img.save(out_path, "PNG")
    print(f"TILE    {os.path.basename(out_path):42s} {img.width}x{img.height}")


def main():
    for src, out in KEY_WHITE:
        sp, op = os.path.join(SRC_DIR, src), os.path.join(SRC_DIR, out)
        if not os.path.exists(sp):
            raise SystemExit(f"MISSING SOURCE: {sp}")
        key_white(sp, op)
    for src, out in PASSTHROUGH:
        sp, op = os.path.join(SRC_DIR, src), os.path.join(SRC_DIR, out)
        if not os.path.exists(sp):
            raise SystemExit(f"MISSING SOURCE: {sp}")
        passthrough(sp, op)


if __name__ == "__main__":
    main()

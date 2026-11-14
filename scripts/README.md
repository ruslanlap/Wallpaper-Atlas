# Download original wallpapers

Requires Python 3.8+; no packages or administrator access. Run from the repository root:

```sh
# Inspect the selection first; no downloads
python3 scripts/download.py --platform mobile --limit 20 --list

# Download 20 phone wallpapers
python3 scripts/download.py --platform mobile --limit 20

# Download all indexed desktop wallpapers into a chosen folder
python3 scripts/download.py --platform desktop --limit 95 --output ~/Pictures/Wallpaper-Atlas
```

On Windows, use `py` instead of `python3` and a Windows path for `--output`.

The script downloads image files only. It does not execute them or change system wallpaper settings. Existing files are skipped. Failed downloads return a nonzero exit code; rerun to retry missing files. Original images can be large. Credits and image terms remain those of the linked sources; see [ATTRIBUTION.md](../ATTRIBUTION.md).

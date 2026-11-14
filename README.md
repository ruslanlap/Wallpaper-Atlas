# Wallpaper Atlas

A curated directory of wallpaper collections for Windows, Linux, macOS, Android and iPhone. Discover your next desktop or mobile background without installing anything.

[![Catalog checks](https://github.com/ruslanlap/Wallpaper-Atlas/actions/workflows/ci.yml/badge.svg)](https://github.com/ruslanlap/Wallpaper-Atlas/actions/workflows/ci.yml) ![Platforms](https://img.shields.io/badge/platforms-desktop%20%26%20mobile-9f82dc) [![Contributions welcome](https://img.shields.io/badge/contributions-welcome-9f82dc)](CONTRIBUTING.md)

**[Browse the wallpaper gallery](https://ruslanlap.github.io/Wallpaper-Atlas/)** · [Desktop](#desktop) · [Mobile](#mobile) · [Setup](#set-your-wallpaper) · [Credits & rights](#credits--rights)

Wallpaper Atlas is a directory of independent collections. Open `index.html` in a browser to search and filter sources; choose an image on the original site and download it there. It does not bundle the images or install software.

## Visual gallery

The site now features 12 landscape wallpapers from the ML4W collection, with verified image dimensions, direct original-image links and per-image source attribution. Images load from upstream, pinned to a commit; they are not mirrored in this repository. Mobile collections remain available in the sources section.

## What you can do

- Search featured wallpapers by name, style or platform; explore 11 source collections below.
- Save favorites locally in your browser (no account required).
- Share a filtered search using the URL fragment when hosted.
- Open an original image or inspect its exact upstream source.

## Desktop

| Collection | Explore | What to expect |
| --- | --- | --- |
| ML4W | [mylinuxforwork](https://github.com/mylinuxforwork/wallpaper) | Collection for tiling window managers |
| Categorized Walls | [dharmx](https://github.com/dharmx/walls) | Categorized wallpaper showcase |
| Original Walls | [orangci](https://github.com/orangci/walls) | Original colors; README links to the newer collection home |
| Wallpaper Bank | [JaKooLit](https://github.com/JaKooLit/Wallpaper-Bank) | A wide variety of wallpapers, popular in Linux customization |
| Catppuccin Mocha | [orangci](https://github.com/orangci/walls-catppuccin-mocha) | Wallpapers adapted to the Mocha palette |
| EndeavourOS | [Official branding](https://github.com/endeavouros-team/Branding) | Official wallpapers and branding assets |
| Linux distros | [Distro-wallpapers](https://github.com/LinuxKits/Distro-wallpapers) | Artwork organized by Linux distribution |
| OS wallpapers | [OS Wallpapers](https://github.com/Tcode-Motion/os-wallpapers) | A desktop-oriented operating-system collection |
| elementary OS | [elementary/wallpapers](https://github.com/elementary/wallpapers) | Wallpapers from elementary OS |

## Mobile

| Collection | Explore | What to expect |
| --- | --- | --- |
| The Wallpaper Collection | [Phone Wallpapers](https://github.com/MilesCorporate/The-Wallpaper-Collection) | A collection with a dedicated portrait phone section |
| Vibe wallpapers | [vibe-dev/wallpapers](https://github.com/vibe-dev/wallpapers) | Fractal designs with documented phone sizes |

Landscape images can work on mobile with cropping; pick portrait files when available. Check image resolution and aspect ratio before downloading.

## Set your wallpaper

Download the original image to your device first. Menu names may vary by OS version.

- **Windows 10/11:** right-click the image in File Explorer → **Set as desktop background**. Or go to Settings → Personalization → Background.
- **macOS:** Control-click the image in Finder → **Set Desktop Picture**. Alternatively, use System Settings → Wallpaper → Add Photo.
- **Linux:** use your desktop's background settings. In GNOME, open Settings → Background; in KDE Plasma, right-click the desktop → Configure Desktop and Wallpaper. On Hyprland/Omarchy, use the wallpaper selector provided by your setup.
- **Android:** open the image in Photos/Gallery → menu → Set as wallpaper; choose home screen, lock screen, or both.
- **iPhone:** save the image to Photos → open it → Share → Use as Wallpaper. Adjust the crop and choose where to apply it.

## Credits & rights

This directory links to third-party repositories. Each source retains its own terms. A repository license may cover code without granting rights to every image; check the original artist and license for each image before redistribution, modification, or commercial use. The orangci collection states that its maintainer did not create the wallpapers and edited some of them. If a creator or rights holder wants a link corrected or removed, please open an issue.

## Contributing

Found a collection we should include? [Suggest it](https://github.com/ruslanlap/Wallpaper-Atlas/issues/new/choose) or read the [contribution guide](CONTRIBUTING.md).

## License

The project code and its own documentation are available under the [MIT license](LICENSE). Third-party images and collections have their own terms; this license does not grant rights to them.

## Run locally

Download the repository and open `index.html`. No build step or dependencies are needed. Favorites stay in this browser and may be unavailable in private browsing.

## Publish with GitHub Pages

In repository Settings → Pages, select **GitHub Actions** as the publishing source. Then run the **Publish Pages** workflow from Actions. Later pushes to `master` republish automatically. The workflow deploys only the site and its guide.

## Development

Run `node --test tests/*.test.cjs`. CI checks the catalog structure and JavaScript syntax; it does not claim that external links are reachable or that image rights have been reviewed.

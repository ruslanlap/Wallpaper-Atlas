# Contributing

Thanks for helping people discover great wallpapers!

## Suggest a collection

Open a collection suggestion or submit a pull request. Look for a distinctive, accessible source with useful wallpaper images. Include the original URL, its creator or maintainer, a short description, platform or orientation tags, and any available image credits and license information. Verify that it is not already listed.

The project indexes collections and selected remote images. Add featured images in `catalog.js` with verified dimensions and a commit-pinned source URL. Do not add image files without a clear permission to redistribute them. A license for code does not automatically cover every image in a collection.

## Change the catalog

The collection data lives in the `collections` array in `catalog.js`; the README offers a text alternative. Update both when adding a source. Keep descriptions factual and the source URL direct. Open `index.html` in a browser to try the filters, search, and saved filter. Run the checks locally with Node.js:

```sh
node --test tests/*.test.cjs
```

Describe your change and verification in the pull request. Be considerate of creators and other contributors.

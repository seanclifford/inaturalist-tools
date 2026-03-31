# iNaturalist Tools by agoranomos
**PLEASE NOTE**: This is still a work in progress, and while parts are functional, it's not in a state to be shared widely yet...

This is a site of small tools to enhance the functionality of iNaturalist.
The first (and only) tool is a mobile friendly annotator.

# Setup
- Install npm (recommend using nvm for this)
- Run `npm install`

# Visual Studio Code Setup
- Install Biome extension and set is as the default typescript formatter

## Pointing to a local iNaturalist server
If you have an iNaturalist instance running locally for testing you can create an [.env.local file](https://vite.dev/guide/env-and-mode#env-files) to overwrite settings in the .env file in order to point to it.

# Dev run
- Run `npm run dev` to start a local tools web server

# Annotator
This tool is made to allow for fast annotations, targeting mobile devices mainly, but with full keyboard support for laptops and desktops

## TODO List

#### Annotator
- Search control improvements
  - Prevent backspacing text being undone after first load
  - backspacing and re searching taxon doesn't remove taxon photo. Should revert.
  - Handle displaying multiple values (comma separated) - currently doesn't load. Could just say 'Multiple' and include ability to remove or re-search?
- Image styling improvements
  - Thumbnails that overflow the row should be scrollable somehow
- Bugs
  - on initial load, often the first result gets replaced, perhaps just with no location after a second. Might be searching twice?
  - when loading more at the end it sometimes takes a long time, or stops working? Tested with no location.
- Settings to choose filters
  - User
  - Has Photos
  - Project
  - Unreviewed
  - Allow unsupported filters to be displayed and added/removed (pills of remaining filters?)
- Allow marking observation as reviewed
- Add QR Code for quick access for mobiles - put it in Help and the Main page
- Consider putting it on it's own domain
- Bulk annotate many observations at once somehow (later)
- Annotation voting for others annotations (later)
- Audio observation support (later)
- Add keyboard shortcuts (later)

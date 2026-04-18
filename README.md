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
- Bugs
  - Zoom Back button should close overlay
  - Long names like eleven spotted cover zoom button preventing opening
  - In search controls, prevent backspacing text being undone after first load
  - Photo thumbnails that overflow the row should be scrollable somehow
- Allow marking observation as reviewed
- Add QR Code for quick access for mobiles - put it in Help and the Main page
- Consider putting it on it's own domain
- Re-consider home page
- Bulk annotate many observations at once somehow (later)
- Annotation voting for others annotations (later)
- Audio observation support (later)
- Add keyboard shortcuts (later)

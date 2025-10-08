# iNaturalist Tools by agoranoms
**PLEASE NOTE**: This is still a work in progress, and while parts are functional, it's not in a state to be shared widely yet...

This is a site of small tools to enhance the functionality of iNaturalist.
The first (and only) tool is a mobile friendly annotator.

# Setup
- Install npm
- Run `npm install`

## Pointing to a local iNaturalist server
If you have an iNaturalist instance running locally for testing you can create an [.env.local file](https://vite.dev/guide/env-and-mode#env-files) to overwrite settings in the .env file in order to point to it.

# Dev run
- Run `npm run dev` to start a local tools web server

# Annotator
This tool is made to allow for fast annotations, targeting mobile devices mainly, but with full keyboard support for laptops and desktops

## TODO List
#### General
- Settings to choose site

#### Annotator
- Move site selection into settings
- Infinite scroll loading
  - Ensure rerenders don't happen too often
  - Look at virtualising the list
- Search control improvements
  - Show a magnifying glass image to the left - replace with taxon image when selected
  - Make sure placeholder text makes sense
  - Don't re-search when re-opening the modal
- Fix bugs
  - Fix vertical scrolling on reptiles and amphibians (Established annotation)
  - Change filter after scrolling right - reset scroll position
- Improve method for changing images?
- Settings to choose filters
    - User
    - Has Photos
    - Project
    - Unreviewed
- Zoom images functionality (how to do this?) - maybe click and hold = zoomed, then drag to move image around somehow
- Allow marking observation as reviewed
- Help or about section in settings
    - link to https://help.inaturalist.org/en/support/solutions/articles/151000191830-what-are-the-definitions-of-inaturalist-annotations
    - explain best practices, or even better, link to them
    - Back to home page
- Annotation voting for others annotations
- Audio observation support
- Tweak styling to suit different displays

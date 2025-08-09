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
- Deploy to public site
- Full Authentication
- Settings to choose site
- Welcome page for first time with some suggested filters

#### Annotator
- Infinite scroll loading
- Display correctly on mobile where aspect ratio is thinner than 1:2
- Zoom images functionality (how to do this?) - maybe click and hold = zoomed, then drag to move image around somehow
- Improve method for changing images?
- Settings to choose filters
    - Taxa
    - Place
    - Without Annotation
    - User
    - Project
    - Unreviewed
- Allow marking observation as reviewed
- Annotation voting for others annotations
- Audio observation support
- Tweak styling to suit different displays

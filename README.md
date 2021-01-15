# Front-APP-Productivity

## Installation

``` bash
# go into app's directory
$ cd front-app-productivity

# install app's dependencies
$ yarn install
```

## Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

### Basic usage

``` bash
# dev server with hot reload at http://localhost:3000
$ npm start
```

Navigate to [http://localhost:3000](http://localhost:3000). The app will automatically reload if you change any of the source files.

### Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for development with minification
$ npm run build
```

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
Aplication
├── public/                        #static files
│   ├── assets/                    #assets
│   └── index.html                 #html template
│
├── src/                           #project root
│   ├── actions/                   #actions
│   ├── assets/                    #assets files
│   │   └── css/                   #css source
│   ├── constants/                 #constants source
│   ├── containers/                #container views source
│   ├── reducers/                  #reducers source
│   ├── selectors/                 #redux selectors
│   ├── utils/                     #utils for views
│   │   └── format.js              #format functions
│   │
│   ├── views/                     #views source
│   ├── App.js
│   ├── App.test.js
│   ├── config.js                  #data to connect with firebase and api's
│   └── store.js                   #redux store
│
├── buildspec.yml                  #pipeline configuration
├── CHANGELOG.md                   #history changes
└── package.json
```

## Creators

**Donald VC**

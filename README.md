![GitHub package.json version](https://img.shields.io/github/package-json/v/thzero/library_client)
![David](https://img.shields.io/david/thzero/library_client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# library_cllient

An opinionated library of common functionality to bootstrap a VueJs based SPA application.

### Installation

[![NPM](https://nodei.co/npm/@thzero/library_client.png?compact=true)](https://npmjs.org/package/@thzero/library_client)

### Requirements

#### Firebase

Google Firebase (https://firebase.google.com) provides the social based authentication; currently only Google social accounts are supported.

* Add a new project
  * If not already completed when setting up the server application
* Setup **Authentication**, enabled Google in the **Sign-in method**.
  * If not already completed when setting up the server application
* Get the Firebase SDK configuration
  * Go to Project Overview->Settings->General
  * Click **Add App** and select **Web**
    * Click *Firebase SDK snippet*, select **Config*
    * Select the JSON object and store it
    * The contents of the JSON object will be stored as key/value pairs in the external/firebase confib object (below)
* Supports Firebase Analytics.
  * Go to Project Overview->Settings->Integrations
    * Enable the Google Analytics.
    * Copy the 'measurementId' key//value pair into the external/firebase config object (below)

#### Configuration

##### Application Configuration

* Setup the configuration in config\development.json of the application
  * Note that this is ignored in the .gitignore
* Configuration looks like the following

```
{
	"backend": [
		{
			"key": "backend",
			"apiKey": "<apikey required by the server component>",
			"baseUrl": "<base url for the api of the server component>"
		}
	],
	"external": {
		"firebase": <firebase key JSON object from above goes here>
	}
}
```

##### Development Tool Configuration

* Copy the /tools/babel.config.js and /tools/vue.config.js to the root folder of the application.
* Include the following in the package.json for the application.

```
  "version_major": #,
  "version_minor": #,
  "version_patch": #,
  "version_date": "MM/DD/YYYY",

  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/recommended",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    },
    "rules": {
      "vue/html-indent": [
        "error",
        "tab"
      ]
      "semi": [ "error", "always" ]
    }
  },
  "postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  },
  "browserslist": [
    "> 4%",
    "last 2 Chrome versions",
    "last 2 Firefox versions",
    "last 2 Safari versions",
    "last 2 FirefoxAndroid versions",
    "not Edge <= 18"
  ]
```

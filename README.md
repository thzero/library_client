[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# library_client

An opinionated library for UI client applications.

## Requirements

### NodeJs

Requires [NodeJs ](https://nodejs.org) version 22+.

### Firebase

Google Firebase (https://firebase.google.com) provides the social based authentication; currently only Google social accounts are supported.

* Add a new project
  * If not already completed when setting up the server application
* Setup **Authentication**, enable Google in the **Sign-in method**.
  * If not already completed when setting up the server application
* Get the Firebase SDK configuration
  * Go to Project Overview->Settings->General
  * Click **Add App** and select **Web**
    * Click *Firebase SDK snippet*, select **Config*
    * Select the JSON object and store it for later use.

## Installation

[![NPM](https://nodei.co/npm/@thzero/library_client.png?compact=true)](https://npmjs.org/package/@thzero/library_client)

### NPM Dependencies

Install the NPM dependencies for the server.

```
npm install
```

## Project setup

### Setup Config

* Setup the configuration found in the config\development.json
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

## Development

### Compiles and hot-reloads for development

Run the application locally using the VueJs development server; requires the server component.

```
npm run serve
```

## Hosting

### Compiles and minifies for production

Compiles the application for deployment to cloud provider.

```
npm run build
```

## Google Cloud Hosting

Login to Google Cloud hosting, select the same account that was setup for Firebase.

Enable the following APIs

* Cloud Build API
* Firebase Management API
* Firebase Hosting API
* Cloud Resource Manager API

### Cloud Build

#### Cloud Build Settings

In Cloud Build, set the Settings page and make sure the following are enabled

* Cloud Run
* Firebase
* Cloud KMS
* Service Accounts

#### Cloud Source Repository

This should have already been setup with the server application.

#### Cloud Build Trigger

##### Event
* Push to branch

###### Region
* Select the same region as used with the Cloud Source Repository

###### Repository Generation
* Select 2nd

##### Source
* Select the repository
* Select "^master$" branch

##### Configuration

###### Type
* Cloud Build configuration file (yaml or json)

###### Location
* Repository
* Cloud Build configuration file location
 * / cloudbuild.yaml

##### Subsitution variables

Add these variables:

* _CONFIG - <application configuration JSON>

##### Application Configuration

Update the following from the above configuration JSON

* apiKey - Set to same value from the server
* baseUrl - Set the value to be the server api's Cloud Run URL.

##### Deploy

Run the trigger to kick of a deploy.

![GitHub package.json version](https://img.shields.io/github/package-json/v/thzero/library_client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# library_client

An opinionated, framework-independent foundation for single page application clients. It provides the service container, the base services an application builds on, and the configuration format.

A framework package sits on top of it: [library_client_vue3](https://github.com/thzero/library_client_vue3) for Vue 3.

## Requirements

### NodeJs

[NodeJs](https://nodejs.org) version 22+.

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

```
npm install @thzero/library_client @thzero/library_common
```

The icon fonts are peer dependencies; install them in the application:

```
npm install @mdi/font material-design-icons-iconfont
```

## What it provides

### Services

Services are registered with an injector at boot and looked up by key from `LibraryClientConstants.InjectorKeys` (`@thzero/library_client/constants`).

| Service | Key | Notes |
|---|---|---|
| `service/config` | `SERVICE_CONFIG` | Reads the application configuration; `getBackend(correlationId, key)` returns a `backend` entry |
| `service/logger` | `SERVICE_LOGGER` | Console logging, plus remote logging of errors and warnings through the utility service |
| `service/security` | `SERVICE_SECURITY` | Role and claims checks; an application extends it and supplies its security model in `_initModel()` |
| `service/restCommunication` | `SERVICE_COMMUNICATION_REST` | Base for the REST packages; on a 401 it refreshes the token, and the call returns an error for the caller to retry |
| `service/auth/user` | `SERVICE_AUTH` | Base for an authentication provider, such as [library_client_firebase](https://github.com/thzero/library_client_firebase) |
| `service/baseUser`, `service/baseSettings` | `SERVICE_USER`, `SERVICE_SETTINGS` | User profile and settings |
| `service/news`, `service/plans`, `service/version`, `service/utility`, `service/usageMetrics`, `service/features`, `service/markupParser`, `service/crypto` | matching keys | |
| `service/admin/news`, `service/admin/users` | `SERVICE_ADMIN_NEWS`, `SERVICE_ADMIN_USERS` | Registered by `boot/adminServices` |

A custom service extends `service/index` and receives the injector in `init`:

```js
import LibraryClientConstants from '@thzero/library_client/constants';

import Service from '@thzero/library_client/service/index';

class YourService extends Service {
	async init(injector) {
		await super.init(injector);

		this._serviceStore = this._injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);
	}
}

export default YourService;
```

`Service` also provides the `_enforce*` argument checks (`_enforceNotNull`, `_enforceNotEmpty` and the rest), which log and throw with a message such as `id is invalid.`.

### Boot

`boot/rootServices` registers every service above. A framework package extends it, and an application extends that to supply its own services. These factories must be supplied, because the defaults throw or return nothing:

* `_initializeSecurity()`, `_initializeVersion()`
* `_initializeAuth()` and `_initializeUser()`, for authentication
* `_initializeCommunicationRest()`, for a REST backend: [library_client_service_rest_fetch](https://github.com/thzero/library_client_service_rest_fetch) or [library_client_service_rest_axios](https://github.com/thzero/library_client_service_rest_axios)
* `_initializeStore()` and `_initializeSettings()`

## Configuration

The application supplies its configuration as JSON, usually `src/config/development.json` and `src/config/production.json`, kept out of source control.

```json
{
	"backend": [
		{
			"key": "backend",
			"apiKey": "<api key required by the server>",
			"baseUrl": "<base url of the server's api>",
			"timeout": 30000
		}
	],
	"external": {
		"firebase": <firebase key JSON object from above goes here>
	}
}
```

* **`backend`**: one entry per server the client calls; `key` is what a service passes to `getBackend` and to the REST calls. `timeout` (milliseconds) is optional and used by the axios package only.
* **`external`**: settings for external services, such as the Firebase configuration used by [library_client_firebase](https://github.com/thzero/library_client_firebase).

## Development

```
npm install
npm test
npm run lint
```

Tests use [Vitest](https://vitest.dev); the `test` folder and the configuration files are not published.

### Compiles and hot-reloads for development

Run the application locally using the VueJs development server; requires the server component.

```
npm run dev
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

## License

[MIT](license.md)

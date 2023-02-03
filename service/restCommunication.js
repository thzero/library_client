import LibraryClientConstants from '../constants';

import CommunicationService from './communication';

class RestCommunicationService extends CommunicationService {
	constructor() {
		super();

		this._serviceStore = null;
	}

	async init(injector) {
		await super.init(injector);

		this._serviceAuth = this._injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_AUTH);
	}

	// eslint-disable-next-line
	async get(correlationId, key, url, options) {
	}

	// eslint-disable-next-line
	async getAuth(correlationId, key, url, auth, options) {
	}

	// eslint-disable-next-line
	async post(correlationId, key, url, body, options) {
	}

	// eslint-disable-next-line
	async postAuth(correlationId, key, url, body, auth, options) {
	}

	async _addTokenHeader() {
		return this._serviceAuth.token;
	}

	_refreshToken(correlationId, force) {
		return this._serviceAuth.refreshToken(correlationId, null, force);
	}
}

export default RestCommunicationService;

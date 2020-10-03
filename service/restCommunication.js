import LibraryConstants from '../constants';

import CommunicationService from './communication';

class RestCommunicationService extends CommunicationService {
	constructor() {
		super();

		this._serviceStore = null;
	}

	async init(injector) {
		await super.init(injector);

		this._serviceStore = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);
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
		return this._serviceStore.state.user.token;
	}
}

export default RestCommunicationService;

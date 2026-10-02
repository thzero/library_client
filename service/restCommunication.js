import LibraryClientConstants from '@thzero/library_client/constants';

import CommunicationService from '@thzero/library_client/service/communication';

class RestCommunicationService extends CommunicationService {
	constructor() {
		super();

		this._serviceStore = null;
	}

	async init(injector) {
		await super.init(injector);

		this._serviceAuth = this._injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_AUTH);
	}

	async get(correlationId, key, url, options) {
	}

	async getAuth(correlationId, key, url, auth, options) {
	}

	async post(correlationId, key, url, body, options) {
	}

	async postAuth(correlationId, key, url, body, auth, options) {
	}

	async _addTokenHeader() {
		return this._serviceAuth.token;
	}

	async _refreshToken(correlationId, force) {
		// Refresh for the signed-in user, as the auth service's own refresh timer
		// does. This used to pass null, and a null user tells the auth service to
		// clear the session, so a 401 wiped the token instead of refreshing it.
		const user = (typeof this._serviceAuth.getExternalUser === 'function') ? await this._serviceAuth.getExternalUser() : null;
		if (!user)
			return;

		return await this._serviceAuth.refreshToken(correlationId, user, force);
	}
}

export default RestCommunicationService;

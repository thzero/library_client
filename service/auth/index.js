import LibraryConstants from '@thzero/library_client/constants';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

import Service from '@thzero/library_client/service/index';

class BaseAuthService extends Service {
	constructor() {
		super();

		this._serviceEvent = null;
		this._serviceUser = null;
	}

	async init(injector) {
		await super.init(injector);

		this._serviceEvent = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_EVENT);
		this._serviceUser = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_USER);
	}

	async announceToken(correlationId, user, token) {
		this._serviceEvent.emit(LibraryConstants.EventKeys.Auth.TokenRefresh, { user: user, token: token});
	}

	async refreshToken(correlationId, user, forceRefresh) {
		throw new NotImplementedError();
	}

	get token() {
		return this._serviceUser.token;
	}
}

export default BaseAuthService;

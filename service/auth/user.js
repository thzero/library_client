import NotImplementedError from '@thzero/library_common/errors/notImplemented';

import BaseAuthService from '@thzero/library_client/index';

class UserAuthService extends BaseAuthService {
	constructor() {
		super();
	}

	async deleteUser(correlationId) {
		throw new NotImplementedError();
	}

	get externalUser() {
		throw new NotImplementedError();
	}

	get isAuthenticated() {
		throw new NotImplementedError();
	}

	async signIn(correlationId) {
		throw new NotImplementedError();
	}

	async signInCompleted(correlationId) {
		throw new NotImplementedError();
	}

	async signOut(correlationId) {
		throw new NotImplementedError();
	}

	async updateExternalUser(correlationId, user) {
		throw new NotImplementedError();
	}
}

export default UserAuthService;

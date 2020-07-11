import LibraryConstants from '../constants';

import ExternalService from './external';

class BaseUserService extends ExternalService {
	constructor() {
		super();

		this._serviceCommunicationRest = null;
		this._serviceStore = null;
	}

	async init(injector) {
		await super.init(injector);

		this._serviceCommunicationRest = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_COMMUNICATION_REST);
		this._serviceStore = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);
	}

	async updateSettings(user, settings) {
		if (!settings)
			return this._error();
		if (!user)
			return this._error();

		this._logger.debug('settings', settings);
		try {
			const response = await this._serviceCommunicationRest.post(LibraryConstants.ExternalKeys.BACKEND, 'user/update/settings', { userId: user.id, settings: settings });
			this._logger.debug('response', response);
			if (response && response.success);
				return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async updateExternal(user) {
		if (!user)
			return this._error();

		this._logger.debug('user', user);
		try {
			const response = await this._serviceCommunicationRest.post(LibraryConstants.ExternalKeys.BACKEND, 'user/update', user);
			this._logger.debug('response', response);
			if (response && response.success)
				return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}
}

export default BaseUserService;

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

	async updateExternal(user) {
		if (!user)
			return this._error('BaseUserService', 'updateExternal');

		this._logger.debug('BaseUserService', 'updateExternal', 'user', user);
		try {
			const response = await this._serviceCommunicationRest.post(LibraryConstants.ExternalKeys.BACKEND, 'user/update', user);
			this._logger.debug('BaseUserService', 'updateExternal', 'response', response);
			if (response && response.success)
				return response;
		}
		catch(err) {
			this._logger.exception('BaseUserService', 'updateExternal', err);
		}

		return this._error('BaseUserService', 'updateExternal');
	}

	async updateSettings(user, settings) {
		if (!settings)
			return this._error('BaseUserService', 'updateSettings');
		if (!user)
			return this._error('BaseUserService', 'updateSettings');

		this._logger.debug('BaseUserService', 'updateSettings', 'settings', settings);
		try {
			const response = await this._serviceCommunicationRest.post(LibraryConstants.ExternalKeys.BACKEND, 'user/update/settings', { userId: user.id, settings: settings });
			this._logger.debug('BaseUserService', 'updateSettings', 'response', response);
			if (response && response.success);
				return response;
		}
		catch(err) {
			this._logger.exception('BaseUserService', 'updateSettings', err);
		}

		return this._error('BaseUserService', 'updateSettings');
	}
}

export default BaseUserService;

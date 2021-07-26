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

	async refreshSettings(correlationId, user) {
		if (!user)
			return this._error('BaseUserService', 'refreshSettings', null, null, null, null, correlationId);

		try {
			const response = await this._serviceCommunicationRest.post(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'users/refresh/settings', { userId: user.id });
			this._logger.debug('BaseUserService', 'refreshSettings', 'response', response, correlationId);
			if (response && response.success);
				return response;
		}
		catch(err) {
			this._logger.exception('BaseUserService', 'refreshSettings', err, correlationId);
		}

		return this._error('BaseUserService', 'refreshSettings', null, null, null, null, correlationId);
	}

	async updateExternal(correlationId, user) {
		if (!user)
			return this._error('BaseUserService', 'updateExternal', null, null, null, null, correlationId);

		this._logger.debug('BaseUserService', 'updateExternal', 'user', user, correlationId);
		try {
			const response = await this._serviceCommunicationRest.post(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'users/update', user);
			this._logger.debug('BaseUserService', 'updateExternal', 'response', response, correlationId);
			if (response && response.success)
				return response;
		}
		catch(err) {
			this._logger.exception('BaseUserService', 'updateExternal', err, correlationId);
		}

		return this._error('BaseUserService', 'updateExternal', null, null, null, null, correlationId);
	}

	async updateSettings(correlationId, user, settings) {
		if (!settings)
			return this._error('BaseUserService', 'updateSettings', null, null, null, null, correlationId);
		if (!user)
			return this._error('BaseUserService', 'updateSettings', null, null, null, null, correlationId);

		this._logger.debug('BaseUserService', 'updateSettings', 'settings', settings, correlationId);
		try {
			const response = await this._serviceCommunicationRest.post(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'users/update/settings', { userId: user.id, settings: settings });
			this._logger.debug('BaseUserService', 'updateSettings', 'response', response, correlationId);
			if (response && response.success);
				return response;
		}
		catch (err) {
			this._logger.exception('BaseUserService', 'updateSettings', err, correlationId);
		}

		return this._error('BaseUserService', 'updateSettings', null, null, null, null, correlationId);
	}
}

export default BaseUserService;

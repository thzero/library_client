import LibraryClientConstants from '../constants';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

import ExternalService from './external';

class BaseUserService extends ExternalService {
	constructor() {
		super();

		this._serviceCommunicationRest = null;
		this._serviceStore = null;
	}

	async init(injector) {
		await super.init(injector);

		this._serviceCommunicationRest = this._injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_COMMUNICATION_REST);
		this._serviceStore = this._injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);
	}

	initializeSettings(correlationId) {
		return {};
	}

	async refreshSettings(correlationId, user) {
		if (!user)
			return this._error('BaseUserService', 'refreshSettings', null, null, null, null, correlationId);

		try {
			// const response = await this._serviceCommunicationRest.post(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, 'users/refresh/settings', { userId: user.id });
			const response = await this._refreshSettingsCommunication(correlationId, user);
			this._logger.debug('BaseUserService', 'refreshSettings', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('BaseUserService', 'refreshSettings', err, correlationId);
			return this._error('BaseUserService', 'refreshSettings', null, err, null, null, correlationId);
		}
	}

	async resetUser(correlationId) {
		throw new NotImplementedError();
	}

	async setAuthCompleted(correlationId) {
		throw new NotImplementedError();
	}

	async setClaims(correlationId, claims) {
		throw new NotImplementedError();
	}

	async setLoggedIn(correlationId, value) {
		throw new NotImplementedError();
	}
	
	async setTokenResult(correlationId, tokenResult) {
		throw new NotImplementedError();
	}

	async setUser(correlationId, user) {
		throw new NotImplementedError();
	}

	get token() {
		throw new NotImplementedError();
	}

	async updateExternal(correlationId, user) {
		if (!user)
			return this._error('BaseUserService', 'updateExternal', null, null, null, null, correlationId);

		this._logger.debug('BaseUserService', 'updateExternal', 'user', user, correlationId);
		try {
			// const response = await this._serviceCommunicationRest.post(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, 'users/update', user);
			const response = await this._updateExternalCommunication(correlationId, user);
			this._logger.debug('BaseUserService', 'updateExternal', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('BaseUserService', 'updateExternal', err, correlationId);
			return this._error('BaseUserService', 'updateExternal', null, err, null, null, correlationId);
		}
	}

	async updateSettings(correlationId, user, settings) {
		if (!settings)
			return this._error('BaseUserService', 'updateSettings', null, null, null, null, correlationId);
		if (!user)
			return this._error('BaseUserService', 'updateSettings', null, null, null, null, correlationId);

		this._logger.debug('BaseUserService', 'updateSettings', 'settings', settings, correlationId);
		try {
			// const response = await this._serviceCommunicationRest.post(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, 'users/update/settings', { userId: user.id, settings: settings });
			const response = await this._updateSettingsCommunications(correlationId, user, settings);
			this._logger.debug('BaseUserService', 'updateSettings', 'response', response, correlationId);
			return response;
		}
		catch (err) {
			this._logger.exception('BaseUserService', 'updateSettings', err, correlationId);
			return this._error('BaseUserService', 'updateSettings', null, err, null, null, correlationId);
		}
	}

	async _refreshSettingsCommunication(correlationId, user) {
		const response = await this._serviceCommunicationRest.post(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, 'users/refresh/settings', { userId: user.id });
		this._logger.debug('BaseUserService', '_refreshSettingsCommunication', 'response', response, correlationId);
		return response;
	}

	async _updateExternalCommunication(correlationId, user) {
		const response = await this._serviceCommunicationRest.post(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, 'users/update', user);
		this._logger.debug('BaseUserService', '_updateExternalCommunication', 'response', response, correlationId);
		return response;
	}

	async _updateSettingsCommunications(correlationId, user, settings) {
		const response = await this._serviceCommunicationRest.post(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, 'users/update/settings', { userId: user.id, settings: settings });
		this._logger.debug('BaseUserService', '_updateSettingsCommunications', 'response', response, correlationId);
		return response;
	}
}

export default BaseUserService;

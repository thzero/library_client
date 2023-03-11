import LibraryClientConstants from '../constants';

import RestExternalService from './externalRest';

class UtilityService extends RestExternalService {
	async initialize(correlationId) {
		try {
			// const response = await this._serviceCommunicationRest.get(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, 'utility/initialize');
			const response = await this._initializeCommunication.get(correlationId);
			this._logger.debug('UtilityService', 'initialize', 'response', response, correlationId);
			if (this._hasSucceeded(response)) {
				response.results.version = {
					server: response.results.version
				};
			}

			return response;
		}
		catch (err) {
			this._logger.exception('UtilityService', 'initialize', err, correlationId);
		}

		return this._error('UtilityService', 'initialize', null, null, null, null, correlationId);
	}

	async logger(correlationId, content) {
		if (!this._serviceCommunicationRest)
			return this._success(correlationId);

		// return await this._serviceCommunicationRest.post(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, 'utility/logger', content);
		return await this._loggerCommunication(correlationId, content);
	}

	async openSource(correlationId) {
		try {
			// const response = await this._serviceCommunicationRest.get(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, 'utility/openSource');
			const response = await this._openSourceCommunication(correlationId);
			this._logger.debug('UtilityService', 'initialize', 'response', response, correlationId);
			return response;
		}
		catch (err) {
			this._logger.exception('UtilityService', 'initialize', err, correlationId);
		}

		return this._error('UtilityService', 'openSource', null, null, null, null, correlationId);
	}
	
	async _initializeCommunication(correlationId) {
		const response = await this._serviceCommunicationRest.get(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, 'utility/initialize');
		this._logger.debug('UtilityService', '_initializeCommunication', 'response', response, correlationId);
		return response;
	}

	async _loggerCommunication(correlationId, content) {
		return await this._serviceCommunicationRest.post(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, 'utility/logger', content);
	}

	async _openSourceCommunication(correlationId) {
		const response = await this._serviceCommunicationRest.get(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, 'utility/openSource');
		this._logger.debug('UtilityService', '_openSourceCommunication', 'response', response, correlationId);
		return response;
	}
}

export default UtilityService;

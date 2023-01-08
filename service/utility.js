import LibraryConstants from '../constants';

import RestExternalService from './externalRest';

class UtilityService extends RestExternalService {
	async initialize(correlationId) {
		try {
			const response = await this._serviceCommunicationRest.get(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'utility/initialize');
			this._logger.debug('ApiService', 'initialize', 'response', response, correlationId);
			if (this._hasSucceeded(response)) {
				response.results.version = {
					server: response.results.version
				};
			}

			return response;
		}
		catch (err) {
			this._logger.exception('ApiService', 'initialize', err, correlationId);
		}

		return this._error('ApiService', 'initialize', null, null, null, null, correlationId);
	}

	async logger(correlationId, content) {
		if (!this._serviceCommunicationRest)
			return this._success(correlationId);

		return await this._serviceCommunicationRest.post(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'utility/logger', content);
	}

	async openSource(correlationId) {
		try {
			const response = await this._serviceCommunicationRest.get(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'utility/openSource');
			this._logger.debug('ApiService', 'initialize', 'response', response, correlationId);
			return response;
		}
		catch (err) {
			this._logger.exception('ApiService', 'initialize', err, correlationId);
		}

		return this._error('ApiService', 'openSource', null, null, null, null, correlationId);
	}
}

export default UtilityService;

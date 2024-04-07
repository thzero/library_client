import LibraryClientConstants from '@thzero/library_client/constants.js';

import RestExternalService from '@thzero/library_client/service/externalRest';

class UsageMetricsService extends RestExternalService {
	async listing(correlationId, params) {
		try {
			const response = await this._listingCommunication(correlationId, params);
			this._logger.debug('MeasurementsService', 'listing', 'response', response, correlationId);
			return response;
		}
		catch (err) {
			return this._error('MeasurementsService', 'listing', null, err, null, null, correlationId);
		}
	}

	async tag(correlationId, type, value) {
		this._enforceNotEmpty('UsageMetricsService', 'tag', type, 'type', correlationId);

		try {
			const response = await this._tagCommunication(correlationId, { 
				type: type,
				value: value
			});
			this._logger.debug('MeasurementsService', 'tag', 'response', response, correlationId);
			return response;
		}
		catch (err) {
			return this._error('MeasurementsService', 'tag', null, err, null, null, correlationId);
		}
	}

	async _listingCommunication(correlationId, params) {
		const response = await this._serviceCommunicationRest.post(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, { url: 'usageMetrics/listing' }, params);
		this._logger.debug('UsageMetricsService', '_listingCommunication', 'response', response, correlationId);
		return response;
	}

	async _tagCommunication(correlationId, tag) {
		const response = await this._serviceCommunicationRest.post(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, { url: 'usageMetrics/tag' }, tag);
		this._logger.debug('UsageMetricsService', '_tagCommunication', 'response', response, correlationId);
		return response;
	}
}

export default UsageMetricsService;

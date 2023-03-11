import LibraryClientConstants from '@thzero/library_client/constants';

import RestExternalService from '@thzero/library_client/service/externalRest';

class PlansService extends RestExternalService {
	async plans(correlationId) {
		try {
			// const response = await this._serviceCommunicationRest.get(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, 'plans');
			const response = await this._plansCommunication(correlationId);
			this._logger.debug('PlansService', 'plans', 'response', response, correlationId);
			return response;
		}
		catch (err) {
			this._logger.exception('PlansService', 'plans', err, correlationId);
		}

		return this._error('PlansService', 'plans', null, null, null, null, correlationId);
	}

	async _plansCommunication(correlationId) {
		const response = await this._serviceCommunicationRest.get(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, 'plans');
		this._logger.debug('PlansService', '_plansCommunication', 'response', response, correlationId);
		return response;
	}
}

export default PlansService;

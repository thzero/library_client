import LibraryClientConstants from '../constants';

import RestExternalService from './externalRest';

class PlansService extends RestExternalService {
	async plans(correlationId) {
		try {
			const response = await this._serviceCommunicationRest.get(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, 'plans');
			this._logger.debug('PlansService', 'plans', 'response', response, correlationId);
			return response;
		}
		catch (err) {
			this._logger.exception('PlansService', 'plans', err, correlationId);
		}

		return this._error('PlansService', 'plans', null, null, null, null, correlationId);
	}
}

export default PlansService;

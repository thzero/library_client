import LibraryConstants from '../constants';

import RestExternalService from './externalRest';

class PlansService extends RestExternalService {
	async plans() {
		try {
			const response = await this._serviceCommunicationRest.get(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'plans');
			this._logger.debug('PlansService', 'plans', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('PlansService', 'plans', err, correlationId);
		}

		return this._error('PlansService', 'plans', null, null, null, null, correlationId);
	}
}

export default PlansService;

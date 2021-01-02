import LibraryConstants from '../constants';

import RestExternalService from './externalRest';

class UtilityService extends RestExternalService {
	async logger(correlationId, content) {
		if (!this._serviceCommunicationRest)
			return this._success(correlationId);

		return await this._serviceCommunicationRest.post(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'utility/logger', content);
	}
}

export default UtilityService;

import LibraryConstants from '../constants';

import RestExternalService from './externalRest';

class UtilityService extends RestExternalService {
	async logger(content) {
		return await this._serviceCommunicationRest.post(LibraryConstants.ExternalKeys.BACKEND, 'utility/logger', content);
	}
}

export default UtilityService;

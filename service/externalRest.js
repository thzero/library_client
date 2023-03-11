import LibraryClientConstants from '@thzero/library_client/constants';

import ExternalService from '@thzero/library_client/service/external';

class RestExternalService extends ExternalService {
	constructor() {
		super();

		this._serviceCommunicationRest = null;
	}

	async init(injector) {
		await super.init(injector);

		this._serviceCommunicationRest = this._injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_COMMUNICATION_REST);
	}
}

export default RestExternalService;

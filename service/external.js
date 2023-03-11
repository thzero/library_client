import LibraryClientConstants from '@thzero/library_client/constants';

import Service from '@thzero/library_client/index';

class ExternalService extends Service {
	constructor() {
		super();

		this._serviceRouter = null;
		this._serviceStore = null;
	}

	async init(injector) {
		await super.init(injector);

		this._serviceRouter = this._injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_ROUTER);
		this._serviceStore = this._injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);
	}
}

export default ExternalService;

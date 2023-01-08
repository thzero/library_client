import ClientConstants from '../constants';

import Service from './index';

class ExternalService extends Service {
	constructor() {
		super();

		this._serviceRouter = null;
		this._serviceStore = null;
	}

	async init(injector) {
		await super.init(injector);

		this._serviceRouter = this._injector.getService(ClientConstants.InjectorKeys.SERVICE_ROUTER);
		this._serviceStore = this._injector.getService(ClientConstants.InjectorKeys.SERVICE_STORE);
	}
}

export default ExternalService;

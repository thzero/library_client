import LibraryConstants from '../constants'

import Service from './index'

class ExternalService extends Service {
	constructor() {
		super()

		this._serviceCommunicationRest = null
		this._serviceRouter = null
		this._serviceStore = null
	}

	init(injector) {
		super.init(injector)

		this._serviceCommunicationRest = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_COMMUNICATION_REST)
		this._serviceRouter = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_ROUTER)
		this._serviceStore = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE)
	}
}

export default ExternalService

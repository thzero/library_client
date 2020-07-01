import LibraryConstants from '../constants'

import RestExternalService from './externalRest'

class PlansService extends RestExternalService {
	async plans() {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, 'plans')
			this._logger.debug('response', response)
			return response
		}
		catch(err) {
			this._logger.exception(err)
		}

		return this._error()
	}
}

export default PlansService

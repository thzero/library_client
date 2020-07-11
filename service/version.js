import LibraryConstants from '../constants';

import NotImplementedError from '../errors/notImplemented';

import RestExternalService from './externalRest';

class ApiService extends RestExternalService {
	async version() {
		let version = {};
		try {
			version.client = _version();
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, 'version');
			this._logger.debug('response', response);
			if (response && response.success)
				version.server = response.results;
		}
		catch (err) {
			this._logger.exception(err);
		}

		return version;
	}

	async _version() {
		throw new NotImplementedError();
	}
}

export default ApiService;

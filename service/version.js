import LibraryConstants from '../constants';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

import RestExternalService from './externalRest';

class ApiVersionService extends RestExternalService {
	async version(correlationId) {
		let version = {};
		try {
			let response = await this._version(correlationId);
			if (response && response.success)
				version.client = response.results;

			if (this._serviceCommunicationRest) {
				response = await this._serviceCommunicationRest.get(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'version');
				if (response && response.success)
					version.server = response.results;
			}
		}
		catch (err) {
			this._logger.exception('ApiVersionService', 'version', err, correlationId);
		}

		return version;
	}

	async _version(correlationId) {
		throw new NotImplementedError();
	}

	_generate(correlationId, version_major, version_minor, version_patch, version_date) {
		const response = this._initResponse(correlationId);
		response.results = {
			major: version_major,
			minor: version_minor,
			patch: version_patch,
			date: version_date
		};
		return response;
	}
}

export default ApiVersionService;

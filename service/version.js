import LibraryConstants from '../constants';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

import RestExternalService from './externalRest';

class ApiVersionService extends RestExternalService {
	async version() {
		let version = {};
		try {
			let response = await this._version();
			if (response && response.success)
				version.client = response.results;
			response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, 'version');
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

	_generate(version_major, version_minor, version_patch, version_date) {
		const response = this._initResponse();
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

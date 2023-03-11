import LibraryClientConstants from '@thzero/library_client/constants';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

import RestExternalService from '@thzero/library_client/service/externalRest';

class ApiVersionService extends RestExternalService {
	async version(correlationId) {
		const version = {};
		try {
			let response = await this._version(correlationId);
			if (this._hasSucceeded(response))
				version.client = response.results;

			if (this._serviceCommunicationRest) {
				// response = await this._serviceCommunicationRest.get(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, 'version');
				response = await this._versionCommunication(correlationId);
				if (this._hasSucceeded(response))
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

	async _versionCommunication(correlationId) {
		const response = await this._serviceCommunicationRest.get(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, 'version');
		this._logger.debug('ApiVersionService', '_versionCommunication', 'response', response, correlationId);
		return response;
	}

	_generate(correlationId, versionMajor, versionMinor, versionPatch, versionDate, copyright, author, author_url) {
		const response = this._initResponse(correlationId);
		response.results = {
			major: versionMajor,
			minor: versionMinor,
			patch: versionPatch,
			date: versionDate,
			copyright: copyright,
			author: author,
			author_url: author_url
		};
		return response;
	}
}

export default ApiVersionService;

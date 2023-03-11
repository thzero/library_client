import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryCommonUtility from '@thzero/library_common/utility';

import RestExternalService from '@thzero/library_client/service/externalRest';

class NewsService extends RestExternalService {
	async latest(correlationId) {
		const timestamp = LibraryCommonUtility.getTimestamp();
		this._logger.debug('NewsService', 'latest', 'timestamp', timestamp, correlationId);
		try {
			// const response = await this._serviceCommunicationRest.get(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, { url: 'news/latest', params: [ timestamp ] });
			const response = await this._latestCommunication(correlationId, timestamp);
			this._logger.debug('NewsService', 'latest', 'response', response, correlationId);
			return response;
		}
		catch (err) {
			this._logger.exception('NewsService', 'latest', err, correlationId);
		}

		return this._error('NewsService', 'latest', null, null, null, null, correlationId);
	}

	async _latestCommunication(correlationId) {
		const response = await this._serviceCommunicationRest.get(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, { url: 'news/latest', params: [ timestamp ] });
		this._logger.debug('NewsService', '_latestCommunication', 'response', response, correlationId);
		return response;
	}
}

export default NewsService;

import LibraryClientConstants from '../constants';

import LibraryCommonUtility from '@thzero/library_common/utility';

import RestExternalService from './externalRest';

class NewsService extends RestExternalService {
	async latest(correlationId) {
		const timestamp = LibraryCommonUtility.getTimestamp();
		this._logger.debug('NewsService', 'latest', 'timestamp', timestamp, correlationId);
		try {
			const response = await this._serviceCommunicationRest.get(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, { url: 'news/latest', params: [ timestamp ] });
			this._logger.debug('NewsService', 'latest', 'response', response, correlationId);
			return response;
		}
		catch (err) {
			this._logger.exception('NewsService', 'latest', err, correlationId);
		}

		return this._error('NewsService', 'latest', null, null, null, null, correlationId);
	}
}

export default NewsService;

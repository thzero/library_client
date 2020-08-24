import LibraryConstants from '../constants';

import Utility from '@thzero/library_common/utility';

import RestExternalService from './externalRest';

class NewsService extends RestExternalService {
	async latest() {
		const timestamp = Utility.getTimestamp();
		this._logger.debug('NewsService', 'latest', 'timestamp', timestamp);
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, { url: 'news/latest', params: [ timestamp ] });
			this._logger.debug('NewsService', 'latest', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('NewsService', 'latest', err);
		}

		return this._error('NewsService', 'latest');
	}
}

export default NewsService;
import LibraryConstants from '../constants';

import Utility from '../utility';

import RestExternalService from './externalRest';

class NewsService extends RestExternalService {
	async latest() {
		const timestamp = Utility.getTimestamp();
		this._logger.debug('timestamp', timestamp);
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, { url: 'news/latest', params: [ timestamp ] });
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}
}

export default NewsService;
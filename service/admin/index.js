import LibraryConstants from '../../constants';

import Utility from '@thzero/library_common/utility';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

import RestExternalService from '../../service/externalRest';

class AdminService extends RestExternalService {
	async create(correlationId, value) {
		try {
			if (!this._allowsCreate)
				return this._error('AdminService', 'create', null, null, null, null, correlationId);

			const response = await this._serviceCommunicationRest.post(correlationId, LibraryConstants.ExternalKeys.BACKEND, `admin/${this._urlFragment()}`, Utility.update(value));
			this._logger.debug('AdminService', 'create', 'response', response, correlationId);
			return response;
		}
		catch (err) {
			this._logger.exception('AdminService', 'create', err, correlationId);
		}

		return this._error('AdminService', 'create', null, null, null, null, correlationId);
	}

	async delete(correlationId, id) {
		try {
			if (!this._allowsDelete)
				return this._error('AdminService', 'delete', null, null, null, null, correlationId);

			const response = await this._serviceCommunicationRest.deleteById(correlationId, LibraryConstants.ExternalKeys.BACKEND, `admin/${this._urlFragment()}`, id);
			this._logger.debug('AdminService', 'delete', 'response', response, correlationId);
			return response;
		}
		catch (err) {
			this._logger.exception('AdminService', 'delete', err, correlationId);
		}

		return this._error('AdminService', 'delete', null, null, null, null, correlationId);
	}

	async search(correlationId, params) {
		const date = Utility.getDate();
		this._logger.debug('AdminService', 'search', 'date', date, correlationId);
		try {
			const response = await this._serviceCommunicationRest.post(correlationId, LibraryConstants.ExternalKeys.BACKEND, `admin/${this._urlFragment()}/search`, params);
			this._logger.debug('AdminService', 'search', 'response', response, correlationId);
			return response;
		}
		catch (err) {
			this._logger.exception('AdminService', 'search', err, correlationId);
		}

		return this._error('AdminService', 'search', null, null, null, null, correlationId);
	}

	async update(correlationId, value) {
		try {
			if (!this._allowsUpdate)
				return this._error('AdminService', 'update', null, null, null, null, correlationId);

			this._cleanse(correlationId, value);
			const response = await this._serviceCommunicationRest.postById(correlationId, LibraryConstants.ExternalKeys.BACKEND, `admin/${this._urlFragment()}`, value.id, Utility.update(value));
			this._logger.debug('AdminService', 'update', 'response', response, correlationId);
			return response;
		}
		catch (err) {
			this._logger.exception('AdminService', 'update', err, correlationId);
		}

		return this._error('AdminService', 'update', null, null, null, null, correlationId);
	}

	get _allowsCreate() {
		return true;
	}

	get _allowsDelete() {
		return true;
	}

	get _allowsUpdate() {
		return true;
	}

	_cleanse(correlationId, value) {
		if (!value)
			return;

		delete value.createdUserId;
		delete value.createdTimestamp;
		delete value.updatedUserId;
	}

	_urlFragment() {
		throw new NotImplementedError();
	}
}

export default AdminService;

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryCommonUtility from '@thzero/library_common/utility/index';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

import RestExternalService from '@thzero/library_client/service/externalRest';

class AdminService extends RestExternalService {
	async create(correlationId, value) {
		try {
			if (!this._allowsCreate)
				return this._error('AdminService', 'create', null, null, null, null, correlationId);

			// const response = await this._serviceCommunicationRest.post(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, `admin/${this._urlFragment()}`, LibraryCommonUtility.update(value));
			const response = await this._createCommunication(correlationId, value);
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

			// const response = await this._serviceCommunicationRest.deleteById(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, `admin/${this._urlFragment()}`, id);
			const response = await this._deleteCommunication(correlationId, id);
			this._logger.debug('AdminService', 'delete', 'response', response, correlationId);
			return response;
		}
		catch (err) {
			this._logger.exception('AdminService', 'delete', err, correlationId);
		}

		return this._error('AdminService', 'delete', null, null, null, null, correlationId);
	}

	async search(correlationId, params) {
		const date = LibraryMomentUtility.getDate();
		this._logger.debug('AdminService', 'search', 'date', date, correlationId);
		try {
			// const response = await this._serviceCommunicationRest.post(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, `admin/${this._urlFragment()}/search`, params);
			const response = await this._searchCommunication.post(correlationId, params);
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
			// const response = await this._serviceCommunicationRest.postById(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, `admin/${this._urlFragment()}`, value.id, LibraryCommonUtility.update(value));
			const response = await this._updateCommunication.post(correlationId, value);
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

	async _createCommunication(correlationId, value) {
		const response = await this._serviceCommunicationRest.post(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, `admin/${this._urlFragment()}`, LibraryCommonUtility.update(value));
		this._logger.debug('AdminService', '_createCommunication', 'response', response, correlationId);
		return response;
	}

	async _deleteCommunication(correlationId, id) {
		const response = await this._serviceCommunicationRest.deleteById(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, `admin/${this._urlFragment()}`, id);
		this._logger.debug('AdminService', '_deleteCommunication', 'response', response, correlationId);
		return response;
	}

	async _searchCommunication(correlationId, id) {
		const response = await this._serviceCommunicationRest.post(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, `admin/${this._urlFragment()}/search`, params);
		this._logger.debug('AdminService', '_searchCommunication', 'response', response, correlationId);
		return response;
	}

	async _updateCommunication(correlationId, value) {
		const response = await this._serviceCommunicationRest.postById(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, `admin/${this._urlFragment()}`, value.id, LibraryCommonUtility.update(value));
		this._logger.debug('AdminService', '_updateCommunication', 'response', response, correlationId);
		return response;
	}

	_urlFragment() {
		throw new NotImplementedError();
	}
}

export default AdminService;

import LibraryConstants from '../../constants';

import Utility from '@thzero/library_common/utility';

import RestExternalService from '../../service/externalRest';

class AdminService extends RestExternalService {
	async create(value) {
		try {
			if (!this._allowsCreate)
				return this._error();

			const response = await this._serviceCommunicationRest.post(LibraryConstants.ExternalKeys.BACKEND, `admin/${this._urlFragment()}`, Utility.update(value));
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async delete(id) {
		try {
			if (!this._allowsDelete)
				return this._error();

			const response = await this._serviceCommunicationRest.deleteById(LibraryConstants.ExternalKeys.BACKEND, `admin/${this._urlFragment()}`, id);
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async search(params) {
		const date = Utility.getDate();
		this._logger.debug('date', date);
		try {
			const response = await this._serviceCommunicationRest.post(LibraryConstants.ExternalKeys.BACKEND, `admin/${this._urlFragment()}/search`, params);
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async update(value) {
		try {
			if (!this._allowsUpdate)
				return this._error();

			this._cleanse(value);
			const response = await this._serviceCommunicationRest.postById(LibraryConstants.ExternalKeys.BACKEND, `admin/${this._urlFragment()}`, value.id, Utility.update(value));
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
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

	_cleanse(value) {
		if (!value)
			return;

		delete value.createdUserId;
		delete value.createdTimestamp;
		delete value.updatedUserId;
	}

	_urlFragment() {
		throw Error('Not Implemented.');
	}
}

export default AdminService;


import LibraryConstants from '../constants';

import Response from '@thzero/library_common/response';

class Service {
	constructor() {
		this._config = null;
		this._logger = null;
		this._serviceSecurity = null;
		this._serviceTranslate = null;
	}

	async init(injector) {
		this._injector = injector;

		this._config = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_CONFIG);
		this._logger = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_LOGGER);
		this._serviceSecurity = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_SECURITY);
		this._serviceTranslate = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_TRANSLATE);
	}

	_enforceNotNull(clazz, method, value, name) {
		if (!value) {
			this._logger.error(clazz, method, `Invalid ${name}`);
			throw Error(`Invalid ${name}`);
		}
	}

	_enforceNotNullOrEmpty(clazz, method, value, name) {
		if (!String.isNullOrEmpty(value)) {
			this._logger.error(clazz, method, `Invalid ${name}`);
			throw Error(`Invalid ${name}`);
		}
	}

	_enforceNotNullResponse(clazz, method, value, name) {
		if (!value) {
			this._logger.error(clazz, method, `Invalid ${name}`);
			return Response.error(`Invalid ${name}`, null);
		}

		return this._success();
	}

	_enforceNotNullOrEmptyResponse(clazz, method, value, name) {
		if (!String.isNullOrEmpty(value)) {
			this._logger.error(clazz, method, `Invalid ${name}`);
			return Response.error(`Invalid ${name}`, null);
		}

		return this._success();
	}

	_enforceNotNullAsResponse(clazz, method, value, name) {
		if (!value) {
			this._logger.error(clazz, method, `Invalid ${name}`);
			return Response.error(`Invalid ${name}`, null);
		}

		const response = this._initResponse();
		response.results = value;
		return response;
	}

	_enforceNotNullOrEmptyAsResponse(clazz, method, value, name) {
		if (!String.isNullOrEmpty(value)) {
			this._logger.error(clazz, method, `Invalid ${name}`);
			return Response.error(`Invalid ${name}`, null);
		}

		const response = this._initResponse();
		response.results = value;
		return response;
	}

	_enforceResponse(clazz, method, response, name) {
		if (!response && !response.success) {
			this._logger.error(clazz, method, `Invalid ${name}`);
			throw response;
		}

		return response;
	}

	_error(clazz, method, message, err, code, errors) {
		if (message)
			this._logger.error(clazz, method, message);
		if (err)
			this._logger.error(clazz, method, err.message);
		if (code)
			this._logger.error(clazz, method, code);
		if (errors)
			this._logger.error(clazz, method, errors);
		return Response.error(message, err, code, errors);
	}

	_errorResponse(clazz, method, response) {
		if (!response)
			return Response.error();

		return Response.error(response.message, response.err);
	}

	async _validate(key, sub, dom, obj, act) {
		return await this._serviceSecurity.validate(key, sub, dom, obj, act);
	}

	_initResponse() {
		return new Response();
	}

	_success() {
		return Response.success();
	}

	_successResponse(value) {
		let response = Response.success();
		response.results = value;
		return response;
	}

	_translate(id, opts) {
		return this._serviceTranslate.translate(id, opts);
	}

	_translateLookup(list, subject, prefix) {
		const output = [];
		for (const prop of list) {
			prop.name = this._translate(`${subject}.${prefix}.${prop.id}`);
			output.push(prop);
		}
		return output;
	}

	_translateName(list, subject, prefix) {
		let temp;
		const output = [];
		for (const prop of Object.values(list)) {
			temp = { id: prop };
			temp.name = this._translate(`${subject}.${prefix}.${temp.id}`);
			output.push(temp);
		}
		return output;
	}
}

export default Service;

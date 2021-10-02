
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

	_enforceNotNull(clazz, method, value, name, correlationId) {
		if (!value) {
			this._logger.error(clazz, method, `Invalid ${name}`, null, correlationId);
			throw Error(`Invalid ${name}`);
		}
	}

	_enforceNotEmpty(clazz, method, value, name, correlationId) {
		if (String.isNullOrEmpty(value)) {
			this._logger.error(clazz, method, `Invalid ${name}`, null, correlationId);
			throw Error(`Invalid ${name}`);
		}
	}
	
	_enforceNotEmptyEither(clazz, method, value1, value2, name1, name2, correlationId) {
		if (String.isNullOrEmpty(value1) && String.isNullOrEmpty(value2)) {
			this._logger.error(clazz, method, `Invalid ${name1} or ${name2}`, null, correlationId);
			throw Error(`Invalid ${name1} or ${name2}`);
		}
	}

	_enforceNotNullResponse(clazz, method, value, name, correlationId) {
		if (!value) {
			this._logger.error(clazz, method, `Invalid ${name}`, null, correlationId);
			return Response.error(`Invalid ${name}`, null);
		}

		return this._success(correlationId);
	}

	_enforceNotEmptyResponse(clazz, method, value, name, correlationId) {
		if (String.isNullOrEmpty(value)) {
			this._logger.error(clazz, method, `Invalid ${name}`, null, correlationId);
			return Response.error(`Invalid ${name}`, null);
		}

		return this._success(correlationId);
	}

	_enforceNotNullAsResponse(clazz, method, value, name, correlationId) {
		if (!value) {
			this._logger.error(clazz, method, `Invalid ${name}`, null, correlationId);
			return Response.error(`Invalid ${name}`, null);
		}

		const response = this._initResponse(correlationId);
		response.results = value;
		return response;
	}

	_enforceNotEmptyAsResponse(clazz, method, value, name, correlationId) {
		if (String.isNullOrEmpty(value)) {
			this._logger.error(clazz, method, `Invalid ${name}`, null, correlationId);
			return Response.error(`Invalid ${name}`, null);
		}

		const response = this._initResponse(correlationId);
		response.results = value;
		return response;
	}

	_enforceResponse(clazz, method, response, name, correlationId) {
		if (!response || (response && !response.success))
			return false;

		return true;
	}

	_error(clazz, method, message, err, code, errors, correlationId) {
		if (message)
			this._logger.error(clazz, method, message, null, correlationId);
		if (err)
			this._logger.exception(clazz, method, err, correlationId);
		if (code)
			this._logger.error(clazz, method, 'code', code, correlationId);
		if (errors) {
			for (const error of errors)
				this._logger.exception(clazz, method, error, correlationId);
		}
		return Response.error(message, err, code, errors, correlationId);
	}

	_hasFailed(response) {
		return Response.hasFailed(response);
	}

	_hasSucceeded(response) {
		return Response.hasSucceeded(response);
	}

	_initResponse(correlationId) {
		return new Response(correlationId);
	}

	_success(correlationId) {
		return Response.success(correlationId);
	}

	_successResponse(value, correlationId) {
		return Response.success(correlationId, value);
	}

	_translate(correlationId, id, opts) {
		return this._serviceTranslate.translate(correlationId, id, opts);
	}

	_translateLookup(correlationId, list, subject, prefix) {
		const output = [];
		for (const prop of list) {
			prop.name = this._translate(correlationId, `${subject}.${prefix}.${prop.id}`);
			output.push(prop);
		}
		return output;
	}

	_translateName(correlationId, list, subject, prefix) {
		let temp;
		const output = [];
		for (const prop of Object.values(list)) {
			temp = { id: prop };
			temp.name = this._translate(correlationId, `${subject}.${prefix}.${temp.id}`);
			output.push(temp);
		}
		return output;
	}

	async _validate(correlationId, key, sub, dom, obj, act) {
		return await this._serviceSecurity.validate(correlationId, key, sub, dom, obj, act);
	}
}

export default Service;

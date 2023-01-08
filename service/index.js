
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

	_enforce(clazz, method, value, name, correlationId, message) {
		if (!value) {
			if (!String.isNullOrEmpty(message))
				message = `${name} is invalid.`;

			this._logger.error(clazz, method, message, null, correlationId);
			const error = Error(message, true);
			error.correlationId = correlationId;
			throw error;
		}
	}

	_enforceNotEmpty(clazz, method, value, name, correlationId) {
		if (String.isNullOrEmpty(value)) {
			this._logger.error(clazz, method, `${name} is empty.`, null, correlationId);
			const error = Error(`${name} is empty.`, true);
			error.correlationId = correlationId;
			throw error;
		}
	}
	
	_enforceNotEmptyEither(clazz, method, value1, value2, name1, name2, correlationId) {
		if (String.isNullOrEmpty(value1) && String.isNullOrEmpty(value2)) {
			this._logger.error(clazz, method, `Either ${name1} or ${name2} is empty.`, null, correlationId);
			const error = Error(`Either ${name1} or ${name2} is empty.`, true);
			error.correlationId = correlationId;
			throw error;
		}
	}

	_enforceNotEmptyMultiple(clazz, method, values, names, correlationId) {
		let valid = true;
		for (const value of values)
			valid &= String.isNullOrEmpty(value);
		if (!valid) {
			names = names.join(', ');
			this._logger.error(clazz, method, `None of the fields are not null: ${names}`, null, correlationId);
			const error = Error(`None of the fields are not null: ${names}`, true);
			error.correlationId = correlationId;
			throw error;
		}
	}

	_enforceNotEmptyResponse(clazz, method, value, name, correlationId) {
		if (String.isNullOrEmpty(value)) {
			this._logger.error(clazz, method, `${name} is empty.`, null, correlationId);
			return Response.error(clazz, method, `${name} is empty.`, null, null, null, correlationId);
		}

		return this._successResponse(value, correlationId);
	}

	_enforceNotNull(clazz, method, value, name, correlationId) {
		if (!value || value === undefined) {
			this._logger.error(clazz, method, `${name} is null.`, null, correlationId);
			const error = Error(`${name} is null.`, true);
			error.correlationId = correlationId;
			throw error;
		}
	}

	_enforceNotNullEither(clazz, method, value1, value2, name1, name2, correlationId) {
		if ((!value1 || value1 === undefined) && (!value2 || value2 == undefined)) {
			this._logger.error(clazz, method, `Either ${name1} or ${name2} is null.`, null, correlationId);
			const error = Error(`Either ${name1} or ${name2} is null.`, true);
			error.correlationId = correlationId;
			throw error;
		}
	}

	_enforceNotNullMultiple(clazz, method, values, names, correlationId) {
		let valid = true;
		for (const value of values)
			valid &= values;
		if (!valid) {
			names = names.join(', ');
			this._logger.error(clazz, method, `None of the fields are not null: ${names}`, null, correlationId);
			const error = Error(`None of the fields are not null: ${names}`, true);
			error.correlationId = correlationId;
			throw error;
		}
	}

	_enforceNotNullResponse(clazz, method, value, name, correlationId) {
		if (!value || value === undefined) {
			this._logger.error(clazz, method, `${name} is null.`, null, correlationId);
			return Response.error(clazz, method, `${name} is null.`, null, null, null, correlationId);
		}

		return this._successResponse(value, correlationId);
	}

	_enforceResponse(clazz, method, response, name, correlationId, message) {
		if (!response || (response && !response.success)) {
			if (!String.isNullOrEmpty(message))
				message = `Unsuccessful response for ${name}.`;

			this._logger.error(clazz, method, message, null, correlationId);
			const error = Error(message, true);
			error.correlationId = correlationId;
			throw error;
		}
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

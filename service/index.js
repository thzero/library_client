
import LibraryConstants from '../constants';

import Response from '../response';

class Service {
	constructor() {
		this._config = null;
		this._logger = null;
		this._security = null;
		this._translateS = null;
	}

	async init(injector) {
		this._injector = injector;

		this._config = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_CONFIG);
		this._logger = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_LOGGER);
		this._security = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_SECURITY);
		this._translateS = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_TRANSLATE);
	}

	_enforceNotNull(value, name) {
		if (!value)
			throw Error(`Invalid ${name}`);
	}

	_enforceNotNullResponse(value, name) {
		if (!value)
			return Response.error(`Invalid ${name}`, null);

		return this._success();
	}

	_error(message, err, code, errors) {
		if (message)
			this._logger.error(message);
		if (err)
			this._logger.error(err.message);
		if (code)
			this._logger.error(code);
		if (errors)
			this._logger.error(errors);
		return Response.error(message, err, code, errors);
	}

	_errorResponse(response) {
		if (!response)
			return Response.error();

		return Response.error(response.message, response.err);
	}

	async _validate(key, sub, dom, obj, act) {
		return await this._security.validate(key, sub, dom, obj, act);
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
		return this._translateS.translate(id, opts);
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

import LibraryConstants from '../constants';

import Utility from '@thzero/library_common/utility';

import Service from './index';

class LoggerService extends Service {
	constructor() {
		super();

		this._serviceUtility = null;
	}

	async init(injector) {
		await super.init(injector);

		this._serviceUtility = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_UTILITY);
	}

	debug(clazz, method, message, data, correlationId) {
		if (!Utility.isDev)
			return;

		// eslint-disable-next-line
		console.log('DEBUG', this._format(clazz, method, message, correlationId), data);
		// this._remoteLogger('DEBUG', clazz, method, message, data, correlationId);
	}

	debug2(message, data, correlationId) {
		if (!Utility.isDev)
			return;

		// eslint-disable-next-line
		console.log('DEBUG', this._format(null, null, message, correlationId), data);
		// this._remoteLogger('DEBUG', null, null, message, data, correlationId);
	}

	error(clazz, method, message, data, correlationId) {
		// eslint-disable-next-line
		console.error('ERROR', this._format(clazz, method, message, correlationId), data);
		this._remoteLogger('ERROR', clazz, method, message, data, correlationId);
	}

	error2(message, data, correlationId) {
		// eslint-disable-next-line
		console.error('ERROR', this._format(null, null, message, correlationId), data);
		this._remoteLogger('ERROR', null, null, message, data, correlationId);
	}

	exception(clazz, method, ex, correlationId) {
		ex = (ex === undefined ? null : ex);
		console.error('ERROR', this._format(clazz, method, null, correlationId), ex);
		this._remoteLoggerException(clazz, method, ex, correlationId);
	}

	exception2(ex, correlationId) {
		ex = (ex === undefined ? null : ex);
		console.error('ERROR', ex);
		console.error('ERROR', this._format(null, null, null, correlationId), ex);
		this._remoteLoggerException(null, null, ex, correlationId);
	}

	fatal(clazz, method, message, data, correlationId) {
		// eslint-disable-next-line
		console.error('FATAL', this._format(clazz, method, message, correlationId), data);
		this._remoteLogger('FATAL', clazz, method, message, data, correlationId);
	}

	fatal2(message, data, correlationId) {
		// eslint-disable-next-line
		console.error('FATAL', this._format(null, null, message, correlationId), data);
		this._remoteLogger('FATAL', null, null, message, data, correlationId);
	}

	info(clazz, method, message, data) {
		// eslint-disable-next-line
		console.log('INFO', this._format(clazz, method, message, correlationId), data);
		// this._remoteLogger('INFO', clazz, method, message, data, correlationId);
	}

	info2(message, data, correlationId) {
		// eslint-disable-next-line
		console.log('INFO', this._format(null, null, message, correlationId), data);
		// this._remoteLogger('INFO', null, null, message, data, correlationId);
	}

	trace(clazz, method, message, data, correlationId) {
		if (!Utility.isDev())
			return

		// eslint-disable-next-line
		console.log('TRACE', this._format(clazz, method, message, correlationId), data);
		// this._remoteLogger('TRACE', clazz, method, message, data, correlationId);
	}

	trace2(message, data, correlationId) {
		if (!Utility.isDev())
			return

		// eslint-disable-next-line
		console.log('TRACE', this._format(null, null, message, correlationId), data);
		// this._remoteLogger('TRACE', null, null, message, data, correlationId);
	}

	warn(clazz, method, message, data, correlationId) {
		// eslint-disable-next-line
		console.log('WARN', this._format(clazz, method, message, correlationId), data);
		this._remoteLogger('WARN', message, data, correlationId);
		this._remoteLogger('WARN', clazz, method, message, data, correlationId);
	}

	warn2(message, data, correlationId) {
		// eslint-disable-next-line
		console.log('WARN', this._format(null, null, message, correlationId), data);
		this._remoteLogger('WARN', message, data, correlationId);
		this._remoteLogger('WARN', null, null, message, data, correlationId);
	}

	_format(clazz, method, message, correlationId) {
		let output = '';
		if (!String.isNullOrEmpty(correlationId))
			output += `(${correlationId}) `;
		if (!String.isNullOrEmpty(clazz))
			output += clazz;
		if (!String.isNullOrEmpty(output))
			output += '.';
		if (!String.isNullOrEmpty(method))
			output += method;
		if (!String.isNullOrEmpty(output))
			output += ': ';
		if (!String.isNullOrEmpty(message))
			output += message;
		return output;
	}

	_remoteLogger(clazz, method, type, message, data, correlationId) {
		const self = this;
		(async () => {
			self._serviceUtility.logger(correlationId, {
				clazz: clazz,
				method: method,
				type: type,
				message: message,
				data: data,
				correlationId: correlationId
			});
		})();
	}

	_remoteLoggerException(clazz, method, ex, correlationId) {
		const self = this;
		(async () => {
			self._serviceUtility.logger(correlationId, {
				clazz: clazz,
				method: method,
				type: 'EXCEPTION',
				ex: ex,
				correlationId: correlationId
			},
			correlationId);
		})();
	}
}

export default LoggerService;

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

	debug(clazz, method, message, data) {
		if (!Utility.isDev)
			return;

		// eslint-disable-next-line
		console.log('DEBUG', this._format(clazz, method, message), data);
		// this._remoteLogger('DEBUG', message, data);
	}

	debug2(message, data) {
		if (!Utility.isDev)
			return;

		// eslint-disable-next-line
		console.log('DEBUG', message, data);
		// this._remoteLogger('DEBUG', message, data);
	}

	error(clazz, method, message, data) {
		// eslint-disable-next-line
		console.error('ERROR', message, data);
		this._remoteLogger('ERROR', this._format(clazz, method, message), data);
	}

	error2(message, data) {
		// eslint-disable-next-line
		console.error('ERROR', message, data);
		this._remoteLogger('ERROR', message, data);
	}

	exception(clazz, method, ex) {
		ex = (ex === undefined ? null : ex);
		console.error('ERROR', this._format(clazz, method), ex);
		this._remoteLoggerException(ex);
	}

	exception2(ex) {
		ex = (ex === undefined ? null : ex);
		console.error('ERROR', ex);
		this._remoteLoggerException(ex);
	}

	fatal(clazz, method, message, data) {
		// eslint-disable-next-line
		console.error('FATAL', message, data);
		this._remoteLogger('FATAL', this._format(clazz, method, message), data);
	}

	fatal2(message, data) {
		// eslint-disable-next-line
		console.error('FATAL', message, data);
		this._remoteLogger('FATAL', message, data);
	}

	info(clazz, method, message, data) {
		// eslint-disable-next-line
		console.log('INFO', this._format(clazz, method, message), data);
		// this._remoteLogger('INFO', message, data);
	}

	info2(message, data) {
		// eslint-disable-next-line
		console.log('INFO', message, data);
		// this._remoteLogger('INFO', message, data);
	}

	trace(clazz, method, message, data) {
		if (!Utility.isDev())
			return

		// eslint-disable-next-line
		console.log('TRACE', this._format(clazz, method, message), data);
		// this._remoteLogger('TRACE', message, data);
	}

	trace2(message, data) {
		if (!Utility.isDev())
			return

		// eslint-disable-next-line
		console.log('TRACE', message, data);
		// this._remoteLogger('TRACE', message, data);
	}

	warn(clazz, method, message, data) {
		// eslint-disable-next-line
		console.log('WARN', this._format(clazz, method, message), data);
		this._remoteLogger('WARN', message, data);
	}

	warn2(message, data) {
		// eslint-disable-next-line
		console.log('WARN', message, data);
		this._remoteLogger('WARN', message, data);
	}

	_format(clazz, method, message) {
		let output = '';
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

	_remoteLogger(type, mmessage, data) {
		const self = this;
		(async () => {
			self._serviceUtility.logger({
				type: type,
				mmessage: mmessage,
				data: data
			});
		})();
	}

	_remoteLoggerException(ex) {
		const self = this;
		(async () => {
			self._serviceUtility.logger({
				type: 'EXCEPTION',
				ex: ex
			});
		})();
	}
}

export default LoggerService;

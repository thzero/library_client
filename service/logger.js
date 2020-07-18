import Constants from '@/constants';
import LibraryConstants from '../constants';

import Utility from '../utility';

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

	debug(message, data) {
		if (!Utility.isDev)
			return;

		// eslint-disable-next-line
		console.log('DEBUG', message, data);
		// this._remoteLogger('DEBUG', message, data);
	}

	error(message, data) {
		// eslint-disable-next-line
		console.error('ERROR', message, data);
		this._remoteLogger('ERROR', message, data);
	}

	exception(ex) {
		ex = (ex === undefined ? null : ex);
		console.error('ERROR', ex);
		this._remoteLoggerException(ex);
	}

	fatal(message, data) {
		// eslint-disable-next-line
		console.error('FATAL', message, data);
		this._remoteLogger('FATAL', message, data);
	}

	info(message, data) {
		// eslint-disable-next-line
		console.log('INFO', message, data);
		// this._remoteLogger('INFO', message, data);
	}

	trace(message, data) {
		if (!Utility.isDev())
			return

		// eslint-disable-next-line
		console.log('TRACE', message, data);
		// this._remoteLogger('TRACE', message, data);
	}

	warn(message, data) {
		// eslint-disable-next-line
		console.log('WARN', message, data);
		this._remoteLogger('WARN', message, data);
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

	get _repositoryUser() {
		return this._injector.getService(Constants.InjectorKeys.REPOSITORY_USER);
	}
}

export default LoggerService;

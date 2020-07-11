import Constants from '@/constants';

import Utility from '../utility';

import Service from './index';

class LoggerService extends Service {
	debug(message, data) {
		if (!Utility.isDev)
			return;

		// eslint-disable-next-line
		console.log('DEBUG', message, data);
	}

	error(message, data) {
		// eslint-disable-next-line
		console.error('ERROR', message, data);
	}

	exception(ex) {
		ex = (ex === undefined ? null : ex);
		console.error('ERROR', ex);
	}

	fatal(message, data) {
		// eslint-disable-next-line
		console.error('FATAL', message, data);
	}

	info(message, data) {
		// eslint-disable-next-line
		console.log('INFO', message, data);
	}

	trace(message, data) {
		if (!Utility.isDev())
			return

		// eslint-disable-next-line
		console.log('TRACE', message, data);
	}

	warn(message, data) {
		// eslint-disable-next-line
		console.log('WARN', message, data);
	}

	get _repositoryUser() {
		return this._injector.getService(Constants.InjectorKeys.REPOSITORY_USER);
	}
}

export default LoggerService;

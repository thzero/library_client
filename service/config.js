import Service from '@thzero/library_client/service/index';

import config from 'local-config';

class ConfigService extends Service {
	constructor() {
		super();

		this._config = null;
		this._configBackend = null;
		this._configExternal = null;
	}

	async init() {
		this._config = config;
		this._configBackend = config['backend'];
		this._configExternal = config['external'];
	}

	get(key) {
		if (String.isNullOrEmpty(key))
			return null;

		if (!this._config)
			return null;

		key = key.toLowerCase();
		return this._config[key];
	}

	getBackend(key) {
		if (String.isNullOrEmpty(key))
			return null;

		if (!this._configBackend)
			return null;

		if (!Array.isArray(this._configBackend))
			return null;

		key = key.toLowerCase();
		for (const item of this._configBackend) {
			if (item.key.toLowerCase() === key)
				return item;
		}

		return null;
	}

	getExternal() {
		return this._configExternal;
	}
}

export default ConfigService;

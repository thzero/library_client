import Service from '@thzero/library_client/service/index';

import config from 'local-config';

class ConfigService extends Service {
	constructor() {
		super();

		this._config = null;
	}

	async init() {
		this._config = config['backend'];
		this._configExternal = config['external'];
	}

	getBackend(key) {
		if (String.isNullOrEmpty(key))
			return null;

		if (!this._config)
			return null;

		if (!Array.isArray(this._config))
			return null;

		key = key.toLowerCase();
		for (const item of this._config) {
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

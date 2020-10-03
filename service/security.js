import rbac from 'easy-rbac';

import Service from './index';

class SecurityService extends Service {
	constructor() {
		super();

		this._enforcers = new Map();
	}

	// eslint-disable-next-line
	async initSecurity(key, model, policies) {
		if (String.isNullOrEmpty(key))
			throw Error('Invalid key');
		if (!model)
			throw Error('Invalid model');

		const enforcer = new rbac(model);
		this._enforcers.set(key, enforcer);
	}

	// eslint-disable-next-line
	async validate(correlationId, key, sub, dom, obj, act) {
		if (String.isNullOrEmpty(key))
			throw Error('Invalid key');

		const enforcer = this._enforcers.get(key);
		if (!enforcer)
			throw Error('No enforcer found');

		const array = [];
		if (dom)
			array.push(dom);
		array.push(obj);
		if (act)
			array.push(act);

		const role = array.join(':');
		const results = await enforcer.can(sub, role);
		return results;
	}
}

export default SecurityService;

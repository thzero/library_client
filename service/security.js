import rbac from 'easy-rbac';

import LibraryCommonUtility from '@thzero/library_common/utility';

import Service from '@thzero/library_client/service/index';

const KeyEnforcerDefault = 'default';

class SecurityService extends Service {
	constructor() {
		super();

		this._enforcers = new Map();
	}

	async init(injector) {
		await super.init(injector);

		this.initSecurity(LibraryCommonUtility.correlationId(), KeyEnforcerDefault, this._initModel());
	}

	// eslint-disable-next-line
	async initSecurity(correlationId, key, model, policies) {
		if (String.isNullOrEmpty(key))
			throw Error('Invalid key');
		if (!model)
			throw Error('Invalid model');

		const enforcer = new rbac(model);
		this._enforcers.set(key, enforcer);
	}

	async validate(correlationId, sub, dom, obj, act) {
		return this.validateEx(correlationId, KeyEnforcerDefault, sub, dom, obj, act);
	}

	// eslint-disable-next-line
	async validateEx(correlationId, key, sub, dom, obj, act) {
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

	_initModel() {
		return null;
	}
}

export default SecurityService;

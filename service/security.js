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

	async authorizationCheckClaims(correlationId, claims, roles, logical) {
		if (!claims)
			return false;
		if (!(claims && Array.isArray(claims)))
			return false;
		if (!roles)
			return true;

		if (String.isNullOrEmpty(logical) || (logical !== SecurityService.logicalAnd) || (logical !== SecurityService.logicalOr))
			logical = SecurityService.logicalOr;

		let success = (logical === SecurityService.logicalOr ? false : true);

		let result;
		let roleAct;
		let roleObj;
		let roleParts;
		for (const claim of claims) {
			this._serviceLogger.debug('SecurityService', 'authorizationCheckClaims', 'authorization.claim', claim, correlationId);

			for (const role of roles) {
				this._serviceLogger.debug('SecurityService', 'authorizationCheckClaims', 'role', role, correlationId);

				roleParts = role.split('.');
				if (roleParts && roleParts.length < 1)
					success = false;

				roleObj = roleParts[0];
				roleAct = roleParts.length >= 2 ? roleParts[1] : null

				result = await this._serviceSecurity.validate(claim, null, roleObj, roleAct);
				this._serviceLogger.debug('SecurityService', 'authorizationCheckClaims', 'result', result, correlationId);
				if (logical === SecurityService.logicalOr)
					success = success || result;
				else
					success = success && result;
			}
		}

		return success;
	}

	async authorizationCheckRoles(correlationId, user, roles, logical) {
		if (!user)
			return false;
		if (!roles || !Array.isArray(roles) || (roles.length === 0))
			return true;

		this._logger.debug('SecurityService', 'authorizationCheckRoles', 'user', user, correlationId);
		if (!(user && user.roles && Array.isArray(user.roles)))
			return false;

		if (String.isNullOrEmpty(logical) || (logical !== SecurityService.logicalAnd) || (logical !== SecurityService.logicalOr))
			logical = SecurityService.logicalOr;

		let success = (logical === SecurityService.logicalOr ? false : true);

		this._logger.debug('SecurityService', 'authorizationCheckRoles', 'logical', logical, correlationId);

		let result;
		let roleAct;
		let roleObj;
		let roleParts;
		for (const userRole of user.roles) {
			this._logger.debug('SecurityService', 'authorizationCheckRoles', 'userRole', userRole, correlationId);

			for (const role of roles) {
				this._logger.debug('SecurityService', 'authorizationCheckRoles', 'role', role, correlationId);

				roleParts = role.split('.');
				if (roleParts && roleParts.length < 1)
					success = false;

				roleObj = roleParts[0];
				roleAct = roleParts.length >= 2 ? roleParts[1] : null

				result = await this.validate(correlationId, userRole, null, roleObj, roleAct);
				this._logger.debug('SecurityService', 'authorizationCheckRoles', 'result', result, correlationId);
				if (logical === SecurityService.logicalOr) {
					if (result)
						return result;

					success = false;
				}
				else
					success = success && result;
			}
		}

		return success;
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

	static logicalAnd = 'and';
	static logicalOr = 'or';
}

export default SecurityService;

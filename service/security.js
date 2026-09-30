import rbac from 'easy-rbac';

import LibraryCommonConstants from '@thzero/library_common/constants';

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
			throw new Error('Invalid key');
		if (!model)
			throw new Error('Invalid model');

		const enforcer = new rbac(model);
		this._enforcers.set(key, enforcer);
	}

	async authorizationCheckClaims(correlationId, claims, roles, logical) {
		if (!claims)
			return false;
		if (!(claims && Array.isArray(claims)))
			return false;
		if (!roles || !Array.isArray(roles) || (roles.length === 0))
			return true;

		if (String.isNullOrEmpty(logical) || (logical !== LibraryCommonConstants.Security.logicalAnd && logical !== LibraryCommonConstants.Security.logicalOr))
			logical = LibraryCommonConstants.Security.logicalOr;

		// The same shape as authorizationCheckRoles, and as the server's
		// BaseSecurityService: outer loop over the REQUIRED roles, inner over the
		// claims. A required role is satisfied when ANY claim validates against it.
		let satisfied;
		for (const role of roles) {
			this._logger.debug('SecurityService', 'authorizationCheckClaims', 'role', role, correlationId);

			const { obj, act } = this._roleSplit(role);

			satisfied = false;
			for (const claim of claims) {
				this._logger.debug('SecurityService', 'authorizationCheckClaims', 'authorization.claim', claim, correlationId);

				// validate(correlationId, sub, dom, obj, act): this was called on a
				// _serviceSecurity that does not exist, with four arguments, so the
				// claim arrived as the correlationId and the subject as null
				if (await this.validate(correlationId, claim, null, obj, act)) {
					satisfied = true;
					break;
				}
			}

			this._logger.debug('SecurityService', 'authorizationCheckClaims', 'satisfied', satisfied, correlationId);
			// or  - any one required role is enough
			// and - every required role must be satisfied
			if (logical === LibraryCommonConstants.Security.logicalOr) {
				if (satisfied)
					return true;
			}
			else if (!satisfied)
				return false;
		}

		return (logical === LibraryCommonConstants.Security.logicalAnd);
	}

	async authorizationCheckRoles(correlationId, user, roles, logical) {
		if (!user)
			return false;
		if (!roles || !Array.isArray(roles) || (roles.length === 0))
			return true;

		this._logger.debug('SecurityService', 'authorizationCheckRoles', 'user', user, correlationId);
		if (!(user && user.roles && Array.isArray(user.roles)))
			return false;

		if (String.isNullOrEmpty(logical) || (logical !== LibraryCommonConstants.Security.logicalAnd && logical !== LibraryCommonConstants.Security.logicalOr))
			logical = LibraryCommonConstants.Security.logicalOr;

		this._logger.debug('SecurityService', 'authorizationCheckRoles', 'logical', logical, correlationId);

		// The outer loop is over the REQUIRED roles, the inner over the user's. A
		// required role is satisfied when ANY of the user's roles validates against
		// it. The loops used to run the other way round with the result
		// accumulated across every pair, so under logicalAnd every user role had
		// to satisfy every required role: a user holding ['admin', 'user'] was
		// denied a route requiring ['user']. The server fixed the same code in
		// BaseSecurityService.
		let satisfied;
		for (const role of roles) {
			this._logger.debug('SecurityService', 'authorizationCheckRoles', 'role', role, correlationId);

			const { obj, act } = this._roleSplit(role);

			satisfied = false;
			for (const userRole of user.roles) {
				this._logger.debug('SecurityService', 'authorizationCheckRoles', 'userRole', userRole, correlationId);

				if (await this.validate(correlationId, userRole, null, obj, act)) {
					satisfied = true;
					break;
				}
			}

			this._logger.debug('SecurityService', 'authorizationCheckRoles', 'satisfied', satisfied, correlationId);
			// or  - any one required role is enough
			// and - every required role must be satisfied
			if (logical === LibraryCommonConstants.Security.logicalOr) {
				if (satisfied)
					return true;
			}
			else if (!satisfied)
				return false;
		}

		return (logical === LibraryCommonConstants.Security.logicalAnd);
	}

	async validate(correlationId, sub, dom, obj, act) {
		return this.validateEx(correlationId, KeyEnforcerDefault, sub, dom, obj, act);
	}

	// eslint-disable-next-line
	async validateEx(correlationId, key, sub, dom, obj, act) {
		if (String.isNullOrEmpty(key))
			throw new Error('Invalid key');

		const enforcer = this._enforcers.get(key);
		if (!enforcer)
			throw new Error('No enforcer found');

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

	_roleSplit(role) {
		// 'object.action'; the action is optional
		const parts = (role ?? '').split('.');
		return {
			obj: parts[0],
			act: parts.length >= 2 ? parts[1] : null
		};
	}
}

export default SecurityService;

import { beforeEach, describe, expect, it } from 'vitest';

import SecurityService from '../service/security';

// a subject can do exactly what its grants list says
const grants = {
	admin: [ 'admin' ],
	user: [ 'user', 'news:read' ]
};

const create = () => {
	const service = new SecurityService();
	service._logger = { debug() {} };
	service._enforcers.set('default', { can: async (sub, role) => (grants[sub] ?? []).includes(role) });
	return service;
};

// [ name, the user's roles (or claims), the required roles, logical, expected ]
const cases = [
	[ 'or: holds one of two', [ 'user' ], [ 'admin', 'user' ], 'or', true ],
	[ 'or: holds none', [ 'user' ], [ 'admin' ], 'or', false ],
	// the regression the server fixed first: the loops ran the other way round, so
	// every held role had to satisfy every required one
	[ 'and: needs user, holds admin and user', [ 'admin', 'user' ], [ 'user' ], 'and', true ],
	[ 'and: needs both, holds both', [ 'admin', 'user' ], [ 'admin', 'user' ], 'and', true ],
	[ 'and: needs both, holds one', [ 'user' ], [ 'admin', 'user' ], 'and', false ],
	[ 'object.action role', [ 'user' ], [ 'news.read' ], 'and', true ],
	[ 'no roles required', [ 'user' ], [], 'and', true ],
	[ 'no logical means or', [ 'user' ], [ 'admin', 'user' ], null, true ]
];

describe('SecurityService.authorizationCheckRoles', () => {
	let service;
	beforeEach(() => { service = create(); });

	it.each(cases)('%s', async (name, held, roles, logical, expected) => {
		expect(await service.authorizationCheckRoles('cid', { roles: held }, roles, logical)).toBe(expected);
	});

	it('denies without a user', async () => {
		expect(await service.authorizationCheckRoles('cid', null, [ 'user' ], 'or')).toBe(false);
	});
});

describe('SecurityService.authorizationCheckClaims', () => {
	let service;
	beforeEach(() => { service = create(); });

	// it used a _serviceSecurity and a _serviceLogger that do not exist, so it threw
	// on every call, and passed validate four of its five arguments
	it.each(cases)('%s', async (name, held, roles, logical, expected) => {
		expect(await service.authorizationCheckClaims('cid', held, roles, logical)).toBe(expected);
	});

	it('denies without claims', async () => {
		expect(await service.authorizationCheckClaims('cid', null, [ 'user' ], 'or')).toBe(false);
	});
});

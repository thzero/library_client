import { describe, expect, it, vi } from 'vitest';

import RestCommunicationService from '../service/restCommunication';

const create = (currentUser) => {
	const service = new RestCommunicationService();
	service._serviceAuth = {
		getExternalUser: vi.fn(async () => currentUser),
		refreshToken: vi.fn(async () => {})
	};
	return service;
};

describe('RestCommunicationService._refreshToken', () => {
	it('refreshes for the signed-in user', async () => {
		const user = { uid: 'u1' };
		const service = create(user);

		await service._refreshToken('cid', true);

		// it passed null, which the auth service treats as "clear the session"
		expect(service._serviceAuth.refreshToken).toHaveBeenCalledWith('cid', user, true);
	});

	it('leaves the session alone when nobody is signed in', async () => {
		const service = create(null);

		await service._refreshToken('cid', true);

		expect(service._serviceAuth.refreshToken).not.toHaveBeenCalled();
	});

	it('leaves the session alone when the auth service cannot name a user', async () => {
		const service = create(null);
		delete service._serviceAuth.getExternalUser;

		await service._refreshToken('cid', true);

		expect(service._serviceAuth.refreshToken).not.toHaveBeenCalled();
	});
});

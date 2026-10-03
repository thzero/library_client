import { describe, expect, it, vi } from 'vitest';

import Response from '@thzero/library_common/response';

import BaseUserService from '../service/baseUser';

const create = () => {
	const service = new BaseUserService();
	service._logger = { debug() {}, error() {}, exception() {} };
	return service;
};

describe('BaseUserService.refreshSettings', () => {
	it('calls the communication method that exists', async () => {
		const service = create();
		const refreshed = Response.success('cid', { id: 'u1' });
		// it called _refreshSettingsUpdate, which is not defined, so it always failed
		const spy = vi.spyOn(service, '_refreshSettingsCommunication').mockResolvedValue(refreshed);

		const response = await service.refreshSettings('cid', { id: 'u1' });

		expect(spy).toHaveBeenCalledWith('cid', { id: 'u1' });
		expect(response).toBe(refreshed);
	});

	it('fails without a user', async () => {
		const service = create();

		const response = await service.refreshSettings('cid', null);

		expect(Response.hasFailed(response)).toBe(true);
	});
});

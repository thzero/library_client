import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import LoggerService from '../service/logger';

describe('LoggerService', () => {
	let service;
	let sent;

	beforeEach(() => {
		sent = [];
		service = new LoggerService();
		service._serviceUtility = { logger: async (correlationId, content) => { sent.push(content); } };
		vi.spyOn(console, 'log').mockImplementation(() => {});
		vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	const flush = () => new Promise(resolve => setTimeout(resolve, 0));

	it('trace and trace2 do not throw', () => {
		// they called the isDev getter as a function
		expect(() => service.trace('Clazz', 'method', 'message', null, 'cid')).not.toThrow();
		expect(() => service.trace2('message', null, 'cid')).not.toThrow();
	});

	it('info does not throw', () => {
		// it used a correlationId it did not take
		expect(() => service.info('Clazz', 'method', 'message', null, 'cid')).not.toThrow();
	});

	it.each([
		[ 'error', 'ERROR' ],
		[ 'fatal', 'FATAL' ],
		[ 'warn', 'WARN' ]
	])('%s sends one remote entry with its type, class and method', async (method, type) => {
		service[method]('Clazz', 'method', 'message', { d: 1 }, 'cid');
		await flush();

		// the server switches on type; with the arguments shifted it received the
		// method name there and dropped every entry
		expect(sent).toEqual([ {
			clazz: 'Clazz',
			method: 'method',
			type: type,
			message: 'message',
			data: { d: 1 },
			correlationId: 'cid'
		} ]);
	});

	it('warn2 sends one remote entry', async () => {
		service.warn2('message', null, 'cid');
		await flush();

		expect(sent).toHaveLength(1);
		expect(sent[0]).toMatchObject({ type: 'WARN', message: 'message', correlationId: 'cid' });
	});

	it('debug and info are not sent remotely', async () => {
		service.debug('Clazz', 'method', 'message', null, 'cid');
		service.info('Clazz', 'method', 'message', null, 'cid');
		await flush();

		expect(sent).toHaveLength(0);
	});
});

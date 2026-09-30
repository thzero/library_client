import { describe, expect, it } from 'vitest';

// Every module in the package loads: catches imports that resolve to nothing,
// undefined identifiers at module scope and syntax errors.
const modules = import.meta.glob([
	'../boot/**/*.js',
	'../data/**/*.js',
	'../service/**/*.js',
	'../utility/**/*.js',
	'../constants.js',
	'../openSource.js'
]);

describe('modules', () => {
	it('finds the modules', () => {
		expect(Object.keys(modules).length).toBeGreaterThan(20);
	});

	it.each(Object.keys(modules))('%s loads', async (key) => {
		const module = await modules[key]();
		expect(module).toBeDefined();
	});
});

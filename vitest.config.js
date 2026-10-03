import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vitest/config';

const local = (p) => fileURLToPath(new URL(p, import.meta.url)).replace(/\\/g, '/');

export default defineConfig({
	resolve: {
		alias: [
			// this package imports its own files by package name
			{ find: /^@thzero\/library_client\//, replacement: local('./') },
			// supplied by the application's build
			{ find: 'local-config', replacement: local('./test/stubs/config.json') }
		]
	},
	test: {
		environment: 'node',
		// the first import transforms the whole dependency tree, cold
		testTimeout: 30000,
		include: [ 'test/**/*.test.js' ],
		setupFiles: [ 'test/setup.js' ],
		server: {
			deps: {
				// @thzero packages import without file extensions, which Vite resolves
				// but Node does not, so they must be transformed rather than externalized
				inline: [ /@thzero\// ]
			}
		}
	}
});

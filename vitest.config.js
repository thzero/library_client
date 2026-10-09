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
		coverage: {
			provider: 'v8',
			reporter: [ 'text-summary', 'lcov' ],
			// every source file, so a file no test loads counts as uncovered
			include: [ '**/*.{js,vue}' ],
			exclude: [ 'test/**', 'coverage/**', '_config/**', '*.config.*', 'openSource.js' ],
			// a ratchet, about 2 points under what was measured on 2026-10-09
			// (statements 20.06, branches 28.57, functions 18.55, lines 20.09);
			// raise these as tests are added, never lower them
			thresholds: { statements: 18, branches: 26, functions: 16, lines: 18 }
		},
		server: {
			deps: {
				// @thzero packages import without file extensions, which Vite resolves
				// but Node does not, so they must be transformed rather than externalized
				inline: [ /@thzero\// ]
			}
		}
	}
});

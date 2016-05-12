module.exports = function(config) {
	config.set({
		basePath: '.',
		frameworks: ['systemjs', 'jspm', 'jasmine'],
		reporters: ['progress', 'coverage', 'threshold'],

		files: [
			'src/app/**/*.js'
		],
		preprocessors: {
			'src/app/**/!(*.spec).js': ['coverage']
		},

		systemjs: {
			configFile: 'config.prod.js',
			includeFiles: [
				'node_modules/es6-shim/es6-shim.min.js',
				'node_modules/reflect-metadata/Reflect.js'
			],
			config: {
				transpiler: false,
				paths: {
					'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.js',
					'systemjs': 'node_modules/systemjs/dist/system.src.js',
					'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.src.js',
					'phantomjs-polyfill': 'node_modules/phantomjs-polyfill/bind-polyfill.js',
					'fs':  'jspm_packages/github/jspm/nodelibs-fs@0.1.2',
					"github:*": "jspm_packages/github/*",
					"npm:*": "jspm_packages/npm/*"
				},
				testFileSuffix: '.spec.js'
			}
		},

		// proxied base paths for loading assets
		proxies: {
			'/src/': '/base/src/'
		},

		coverageReporter: {
			dir: "coverage/",
			reporters: [
				{ type: 'json', subdir: '.', file: 'report.json' }
			]
		},
		thresholdReporter: {
			statements: 50,
			branches: 50,
			functions: 50,
			lines: 50
		},

		browsers: ['PhantomJS'],
		//browsers: ['Chrome'],
		phantomjsLauncher: {
			// Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
			exitOnResourceError: true
		},

		port: 9876,
		runnerPort: 9100,
		captureTimeout: 10000,

		autoWatch: false,
		singleRun: true
	})
}
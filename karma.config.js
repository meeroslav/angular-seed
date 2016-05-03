module.exports = function(config) {

	var appBase   = 'app/';      // transpiled app JS files
	var appAssets ='/base/app/'; // component assets fetched by Angular's compiler

	config.set({
		basePath: '',
		frameworks: ['systemjs', 'jspm', 'jasmine'],
		reporters: ['progress', 'coverage', 'threshold'],
		
		files: [
			'src/app/**/*.js'
		],
		exclude: [],
		preprocessors: {
			'src/app/**/!(*.spec).js': ['coverage']
		},
		
		systemjs: {
			configFile: 'config.js',
			config: {
				paths: {
					'system-polyfills': 'jspm_packages/system-polyfills.src.js',
					'systemjs': 'jspm_packages/system.src.js',
					
					// 'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.js',
					// 'phantomjs-polyfill': 'node_modules/phantomjs-polyfill/bind-polyfill.js',
					// 'fs':  'jspm_packages/github/jspm/nodelibs-fs@0.1.2',
					"github:*": "jspm_packages/github/*",
					"npm:*": "jspm_packages/npm/*",
				},
		 		testFileSuffix: '.spec.js'
			}
		},

		// proxied base paths for loading assets
		proxies: {
			// required for component assets fetched by Angular's compiler
			"/src/": '/base/src/'
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
		phantomjsLauncher: {
			// Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom) 
			exitOnResourceError: true
		},		

		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		singleRun: true
	})
}
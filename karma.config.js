module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        reporters: ['progress', 'coverage'],

        files: [
            // System JS
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',
            // Polyfill
            'node_modules/es6-shim/es6-shim.min.js',
            // 'node_modules/core-js/client/shim.js',
            // Reflect and Zone.js
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',
            // RxJS and Angular
            {pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false},
            {pattern: 'node_modules/@angular/**/*.js', included: false, watched: false},
            {pattern: 'node_modules/ng2-translate/**/*.js', included: false, watched: false},
            // SystemJS config and Karma test override
            {pattern: 'system.config.js', included: false, watched: false},
            'karma.test-shim.js',
            // Paths loaded via module imports
            {pattern: 'src/app/**/*.js', included: false, watched: true},
            {pattern: 'src/app/**/*.html', included: false, watched: true},
            {pattern: 'src/assets/styles/**/*.css', included: false, watched: true},
            // Paths to support debugging with source maps in dev tools
            {pattern: 'src/app/**/*.ts', included: false, watched: false},
            {pattern: 'src/app/**/*.js.map', included: false, watched: false}
        ],
        preprocessors: {
            'src/app/**/!(*.spec).js': ['coverage']
        },

        // proxied base paths for loading assets
        proxies: {
            '/src/': '/base/src/',
            '/node_modules/': '/base/node_modules/'
        },

        coverageReporter: {
            dir: "coverage/",
            reporters: [
                { type: 'json', subdir: '.', file: 'report.json' }
            ],
            includeAllSources: true
        },

        browsers: ['PhantomJS'],
        // browsers: ['Chrome'],
        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        },

        port: 9876,
        runnerPort: 9100,
        captureTimeout: 6000,

        autoWatch: false,
        singleRun: true
    })
}
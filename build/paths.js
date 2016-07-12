module.exports = {
    languages: ['en', 'de'],
    clean: {
        ts: ['src/app/**/*.js', '!src/app/**/*.spec.js', 'src/app/**/*.js.map', '!src/app/**/*.spec.js.map', 'dist/app/**/*.js', 'dist/app/**/*.js.map'],
        styles: ['src/assets/styles/**/*.css', 'dist/assets/**/*.css'],
        html: ['dist/**/*.html'],
        images: ['dist/assets/images/'],
        fonts: ['dist/assets/styles/fonts'],
        tests: ['src/app/**/*.spec.js', 'src/app/**/*.spec.js.map'],
        locales: ['dist/assets/locales/'],
        configs: ['dist/configs/*.json'],
        all: [
            'src/app/**/*.js',
            'src/app/**/*.map',
            'src/assets/styles/**/*.css',
            'dist',
            'coverage',
            'temp'
        ]
    },
    coverage: {
        report: 'coverage/report.json',
        base: 'coverage/'
    },
    compile: {
        styles: {
            srcBase: 'src/assets/styles/',
            destBase: 'dist/assets/styles/',
            styleOrder: [
                // order of importance for css files
                'src/assets/styles/shared.css',
                'src/assets/styles/typography.css',
                'src/assets/styles/appicons.css',
                'src/assets/styles/header.css',
                'src/assets/styles/navigation.css',
                'src/assets/styles/*/**/*.css'
            ]
        },
        scripts: {
            srcBase: 'src/app/'
        }
    },
    dist: {
        dependencies: [
            './node_modules/es6-shim/es6-shim.min.js',
            './node_modules/zone.js/dist/zone.js',
            './node_modules/reflect-metadata/Reflect.js'
        ],
        dev: [
            './dist/lib/dependencies.js',
            './dist/lib/system.src.js',
            './dist/lib/system.config.js',
            './dist/lib/system.init.js'
        ],
        prod: ['./dist/app/dependencies*.js', './dist/app/bundle*.js'],
        prodCSS: ['./dist/assets/styles/**/*.css']
    },
    // helper method
    mapDistToSrc: function (asset) {
        return asset.replace('dist/', 'src/');
    },
    mapSrcToDist: function (asset) {
        return asset.replace('src/', './dist/');
    }
};
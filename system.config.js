(function(global) {
    var map = {
        'application': 'src/app',
        'rxjs': 'node_modules/rxjs',
        '@angular': 'node_modules/@angular',
        'ng2-translate': 'node_modules/ng2-translate'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'application': { main: 'main', defaultExtension: 'js', format: 'register' },
        'rxjs': { defaultExtension: 'js' },
        'ng2-translate': { defaultExtension: 'js', main: 'ng2-translate.js' }
    };

    var packageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router'
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    function packIndex(pkgName) {
        packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }

    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }
    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

    // Add package entries for angular packages
    packageNames.forEach(setPackageConfig);

    // No umd for router yet
    packages['@angular/router'] = { main: 'index.js', defaultExtension: 'js' };


    System.config({
        defaultJSExtensions: true,
        map: map,
        packages: packages
    });
})(this);

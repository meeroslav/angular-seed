// general
var gulp = require('gulp');
var path = require('../paths');
var jsoncombine = require("gulp-jsoncombine");
var argv = require('yargs').argv;
// inject assets
var inject = require('gulp-inject');
var git = require('git-rev');

function processData(data) {
    var parentConfig;
    Object.keys(data).forEach(function (key) {
        if (key.indexOf('.local') !== -1) {
            if (!argv.prod) { // for dev merge local changes with parent config
                parentConfig = data[key.slice(0, -6)]; // without '.local'
                Object.keys(data[key]).forEach(function(environment) {
                    Object.keys(data[key][environment]).forEach(function (property) {
                        // copy property to parent config
                        parentConfig[environment] = parentConfig[environment] || {};
                        parentConfig[environment][property] = data[key][environment][property];
                    });
                });
            }
            delete data[key];
        }
    });
    return data;
}

// entry task
gulp.task('build:configs', function (done) {
    return gulp.src(path.clean.configs.map(path.mapDistToSrc))
        .pipe(jsoncombine("configs.json", function (data) {
            var processedData = processData(data);
            return new Buffer(JSON.stringify(processedData));
        }))
        .pipe(gulp.dest('dist/configs'));
});

var gitData = {};
gulp.task('fetchGit', function(cb) {
    var counter = 0;
    git.long(function (str) {
        counter++;
        gitData.commit = str;
        counter === 2 && cb();
    });
    git.branch(function (str) {
        counter++;
        gitData.branch = str;
        counter === 2 && cb();
    });
    //git.tag(function (str) {
    //    counter++;
    //    gitData.tag = str;
    //    counter === 4 && cb();
    //});
    //git.log(function (array) {
    //    counter++;
    //    gitData.log = array;
    //    counter === 4 && cb();
    //});
});

// create a health page for checking the configuration
gulp.task('build:healthPage', ['fetchGit'], function (done) {
    return gulp.src('src/health/index.html')
        .pipe(inject(gulp.src(['dist/configs/configs.json'], { read: true }), {
            starttag: '/INPUT/ + ',
            endtag: '/HERE/',
            removeTags: true,
            transform: function (filePath, file) {
                var configData = JSON.parse(file.contents.toString('utf8'));
                return JSON.stringify({
                    git: gitData,
                    configs: configData
                });
            }
        }))
        .pipe(gulp.dest('dist/health'));
});
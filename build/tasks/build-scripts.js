// general
var gulp = require('gulp');
var path = require('../paths');
var runSequence = require('run-sequence');
// for tslint
var tslint = require("gulp-tslint");
// for compile
var ts = require('gulp-typescript');
var tsProject = ts.createProject('./tsconfig.json');
var sourcemaps = require("gulp-sourcemaps");
// for bundle deps
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var merge = require('merge2');
// for bundle
var argv = require('yargs').argv;
var rev = require('gulp-rev');
var Builder = require('systemjs-builder');
var gutil = require('gulp-util');

function bundle(moduleName, outputFile, outputConfig, sfx) {
    var builder = new Builder('.', 'system.config.js');

    gutil.log(gutil.colors.bgCyan('[systemjs-builder]'), gutil.colors.cyan('Bundling started'));
    return (sfx ? builder.buildStatic : builder.bundle).call(builder, moduleName, outputFile, outputConfig).then(function () {
        gutil.log(gutil.colors.bgCyan('[systemjs-builder]'), gutil.colors.cyan('Bundling done'));
    })
    .catch(function(err) {
        gutil.log(gutil.colors.bgRed('[systemjs-builder]'), gutil.colors.red('Bundling failed'), err);
    });
};

gulp.task('build:scripts', function(done){
    if (argv.notest) {
        return runSequence(
            'tslint',
            'compile:ts',
            'bundle:script:deps',
            'bundle:scripts',
            'copy:scripts',
            done
        );
    }
    return runSequence(
        'tslint',
        'compile:ts',
        'test',
        'bundle:script:deps',
        'bundle:scripts',
        'copy:scripts',
        done
    );
});

// ts lint code
gulp.task('tslint', function(){
    return gulp.src([path.compile.scripts.srcBase + '**/!(*.spec).ts'])
        .pipe(tslint())
        .pipe(tslint.report("full"));
});

gulp.task('compile:ts', function(){
    return gulp.src([path.compile.scripts.srcBase + '**/*.ts'])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(sourcemaps.write('.', {
            includeContent: true
        }))
        .pipe(gulp.dest(path.compile.scripts.srcBase));
});

function buildDependencies(destFolder){
    return gulp.src(path.dist.dependencies)
        .pipe(gulpif(argv.prod, uglify()))
        .pipe(concat('dependencies.js'))
        .pipe(gulpif(argv.prod, rev()))
        .pipe(gulp.dest(destFolder));
}
gulp.task('bundle:script:deps', function(cb){
    if (argv.prod) {
        return buildDependencies('dist/app');
    } else {
        return merge(
            buildDependencies('dist/lib'),
            gulp.src(['./node_modules/systemjs/dist/system.src.js', './system.config.js', './src/system.init.js'])
                .pipe(gulp.dest('dist/lib')),
            bundle('application - [src/app/**/*]', 'dist/lib/bootstrap.js',
                 { minify: false, sourceMaps: false })
        );
    }
});

gulp.task('bundle:scripts', function(cb) {
    // if dev just copy all files to dist
    if (!argv.prod) {
        return cb();
    }

    return bundle('application', 'temp/bundle.js', { minify: true, sourceMaps: false }, true);
});

gulp.task('copy:scripts', function(){
    var filePaths = argv.prod ?
        'temp/bundle.js' :
        ['temp/bundle.js', 'src/app/**/*.js', 'src/app/**/*.map' ];

    return gulp.src(filePaths)
        .pipe(gulpif(argv.prod, rev()))
        .pipe(gulp.dest('dist/app'));
});

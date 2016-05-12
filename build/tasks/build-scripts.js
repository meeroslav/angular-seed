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
var jspm = require('gulp-jspm');
var merge = require('merge2');
// for bundle
var argv = require('yargs').argv;
var rev = require('gulp-rev');
var Builder = require('systemjs-builder');

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
		'bundle:script:deps',
		'test',
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
		.pipe(uglify())
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
			gulp.src('src/app/bootstrap.js')
				.pipe(jspm({
					arithmetic: '- [src/app/**/*]'
				}))
				.pipe(gulp.dest('dist/lib')),
			gulp.src(['./jspm_packages/system.src.js', './config.js', './src/system.init.js'])
				.pipe(gulp.dest('dist/lib'))
		);
	}
});

gulp.task('bundle:scripts', function(cb) {
	// if dev just copy all files to dist
	if (!argv.prod) {
		return cb();
	}

	// build static bundle
	var builder = new Builder();
	builder.loadConfig('config.prod.js').then(function(){
		var bundled = builder.buildStatic('src/app/bootstrap', 'temp/bundle.js', {
			minify: true,
			sourceMaps: false
		});
		bundled.then(function(){
			return cb();
		}).catch(function(ex){
			cb(new Error(ex));
		});
	}).catch(function(ex){
		cb(new Error(ex));
	});
});

gulp.task('copy:scripts', function(){
	var filePaths = argv.prod ?
		'temp/bundle.js' :
		['temp/bundle.js', 'src/app/**/*.js', 'src/app/**/*.map', 'src/app/**/*.ts' ];

	return gulp.src(filePaths)
		.pipe(gulpif(argv.prod, rev()))
		.pipe(gulp.dest('dist/app'));
});

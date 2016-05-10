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
			done
		);
	}
	return runSequence(
		'tslint',
		'compile:ts',
		'test',
		'bundle:script:deps',
		'bundle:scripts',
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
			includeContent: true,
			sourceRoot: "app/"
		}))
		.pipe(gulp.dest(path.compile.scripts.srcBase));
});

gulp.task('bundle:script:deps', function(cb){
	return gulp.src(path.dist.dependencies)
		.pipe(gulpif(argv.prod, uglify()))
		.pipe(concat('dependencies.js'))
		.pipe(gulpif(argv.prod, rev()))
		.pipe(gulp.dest('dist/app'));
});

gulp.task('bundle:scripts', function(cb){
	// if dev just copy all files to dist
	if (!argv.prod) {
		return cb();
	}

	// build static bundle
	var builder = new Builder();
	builder.loadConfig('config.js').then(function(){
		var bundled = builder.buildStatic('src/app/bootstrap', 'temp/bundle.js', {
			// minify: true,
			// sourceMaps: false
			minify: false,
			sourceMaps: true
		});
		bundled.then(function(){
			return runSequence(
				'copy:ts',
				cb
			);
		}).catch(function(ex){
			cb(new Error(ex));
		});
	}).catch(function(ex){
		cb(new Error(ex));
	});
});

gulp.task('copy:ts', function(){
	return gulp.src('temp/bundle.js')
		.pipe(rev())
		.pipe(gulp.dest('dist/app'));
});

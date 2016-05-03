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
// for bundle
var argv = require('yargs').argv;
var rev = require('gulp-rev');
var Builder = require('systemjs-builder');

gulp.task('build:scripts', function(done){
	return runSequence(
		'tslint',
		'compile:ts',
		'test',
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

gulp.task('bundle:scripts', function(cb){
	// if dev just copy all files to dist
	if (!argv.prod) {
		return cb();
	}
	
	// build static bundle
	var builder = new Builder();
	builder.loadConfig('config.js').then(function(){
		var bundled = builder.buildStatic('src/app/app', 'src/app/bundle.js', {
			minify: true,
			sourceMaps: false
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

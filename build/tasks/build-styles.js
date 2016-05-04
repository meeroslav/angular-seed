// general
var gulp = require('gulp');
var path = require('../paths');
var runSequence = require('run-sequence');
// for compile
var less = require('gulp-less');
var filter = require('gulp-filter');
// for bundle
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var cleanCSS = require('gulp-clean-css');
var rev = require('gulp-rev');
var concat = require('gulp-concat');

// entry task
gulp.task('build:styles', function(done){
	return runSequence(
		'compile:styles',
		'bundle:styles',
		done
	);
});

gulp.task('compile:styles', function(){
	return gulp.src(path.compile.styles.srcBase + '**/*.less')
		.pipe(less({}))
		.pipe(filter(function(file) { // skip empty css files
			return file.stat && file.contents.length;
		}))
		.pipe(gulp.dest(path.compile.styles.srcBase));
});

gulp.task('bundle:styles', function(){
	return gulp.src(path.compile.styles.srcBase + '**/*.css')
		.pipe(gulpif(argv.prod, cleanCSS()))
		.pipe(gulpif(argv.prod, concat('bundle.css')))
		.pipe(gulpif(argv.prod, rev()))
		.pipe(gulp.dest(path.compile.styles.destBase));
});
// general
var gulp = require('gulp');
var path = require('../paths');
var runSequence = require('run-sequence');
// inject partials
var injectPartials = require('gulp-inject-partials');
var argv = require('yargs').argv;
// inject assets
var inject = require('gulp-inject');

gulp.task('build:html', function(done){
	return runSequence(
		'inject:partials',
		'copy:index',
		'inject:assets',
		done
	);
});

function injectTask(source, destination, newFileName) {
	return gulp.src(source)
		.pipe(injectPartials({
			removeTags: argv.prod,
			quiet: argv.prod
		}))
		.pipe(gulp.dest(destination));
}
gulp.task('inject:partials', function(){
	return gulp.src(['src/*/**/*.html', '!src/*/**/_*.html'])
		.pipe(injectPartials({
			removeTags: argv.prod,
			quiet: argv.prod
		}))
		.pipe(gulp.dest('dist'));
});
gulp.task('copy:index', function(){
	return gulp.src('src/index.html')
		.pipe(gulp.dest('dist'));
});
gulp.task('inject:assets', function(){
	var jsSources = path.dist[argv.prod ? 'prod' : 'dev'];
	var cssSources = path.dist.styles;
	var sources = gulp.src(jsSources.concat(cssSources), { read: false });

	return gulp.src('dist/index.html')
		.pipe(inject(sources, {
			relative: true,
			removeTags: argv.prod,
			empty: argv.prod
		}))
		.pipe(gulp.dest('dist'));
});
// general
var gulp = require('gulp');
var path = require('../paths');
var runSequence = require('run-sequence');
// inject partials
var injectPartials = require('gulp-inject-partials');
var argv = require('yargs').argv;
var merge = require('merge2');
// inject assets
var inject = require('gulp-inject');

gulp.task('build:html', function(done){
	return runSequence(
		'inject:partials',
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
	return merge(
		injectTask(['src/*/**/*.html', '!src/*/**/_*.html'], 'dist'),
		injectTask('src/index.html', '.')
	);
});

gulp.task('inject:assets', function(){
	var jsSources = path.dist[argv.prod ? 'prod' : 'dev'];
	var cssSources = path.dist.styles;
	var sources = gulp.src(jsSources.concat(cssSources), { read: false });
	
	return gulp.src('index.html')
		.pipe(inject(sources, {
			relative: true,
			removeTags: argv.prod,
			empty: argv.prod
		}))
		.pipe(gulp.dest('.'));
});
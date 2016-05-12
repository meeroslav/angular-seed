var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(done){
console.log('              ______                       __ ');
console.log('.-----.-----.|__    |.-----.-----.-----.--|  |');
console.log('|     |  _  ||    __||__ --|  -__|  -__|  _  |');
console.log('|__|__|___  ||______||_____|_____|_____|_____|');
console.log('      |_____|                                 ');
console.log('                                   ........   ');


	return runSequence(
		'clean',
		['copy', 'build:styles', 'build:scripts'],
		'build:html',
		done
	);
});
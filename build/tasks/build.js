var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(done){
console.log(' _____  ___    __    ___      ___   ________        __        ');
console.log('|\\"   \\|"  \\  |" \\  |"  \\    /"  |  \\"     "\\      /""\\       ');
console.log('|.\\\\   \\    | ||  |  \\   \\  //   |   \\ ___  :|    /    \\      ');
console.log('|: \\.   \\\\  | |:  |  /\\\\  \\/.    | |: |   \\ ||   /` /\\  \\     ');
console.log('|.  \\    \\. | |.  | |: \\.        | || |___/ ||  //  __`  \\    ');
console.log('|    \\    \\ |  \\  | |.  \\    /:  | |:       :| /   /  \\  \\\\   ');
console.log(' \\___|\\____/    \\_| |___|\\__/|___| |________/ |___/    \\___|  ');
console.log('                                                              ');
	
	return runSequence(
		'clean',
		['copy', 'build:styles', 'build:scripts'],
		'build:html',
		done
	);
});
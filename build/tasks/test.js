var gulp = require('gulp');
// test
var TestServer = require('karma').Server; 
// coverage
var remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
var path = require('../paths');

gulp.task('test', function(done){
	var doneCallback = function() { done(); };
	var options = {
		configFile: __dirname + '/../../karma.config.js', 
	};
	return new TestServer(options, 
		function() {
			done();
		}).start();
});

gulp.task('coverage', function(){
	return gulp.src(path.coverage.report)
		.pipe(remapIstanbul({
			basePath: '.',
			reports: {
				'teamcity': path.coverage.base + 'report.txt',
				'html': path.coverage.base + 'html-report'
			}
	    }));
});
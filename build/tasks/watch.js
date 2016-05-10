var gulp = require('gulp');
var runSequence = require('run-sequence');

// add - file was added to watch or created
// change - file was changed
// unlink - file was deleted
function copyAndClean(event, param) {
  if (event.type === 'unlink') {
    runSequence('watch:start', 'clean:' + param, 'copy:' + param);
  } else {
    runSequence('watch:start', 'copy:' + param);
  }
}

gulp.task('watch:start', function(){
	console.log("________________________________________________________");
});

gulp.task('watch', function (done) {
  gulp.watch(['coverage/report.json'], ['coverage']); // guess coverage will never be unlinked, only added and updated

  // process static assets
  gulp.watch(['src/assets/images/**/*.*'], function(event){
    copyAndClean(event, 'images');
  });
  gulp.watch(['src/assets/styles/fonts/**/*.*'], function(event){
    copyAndClean(event, 'fonts');
  });
  gulp.watch(['src/assets/locales/**/*.*'], function(event){
    copyAndClean(event, 'locales');
  });

  // process styles
  gulp.watch(['src/assets/styles/**/*.less'], function(event){
    if (event.type === 'unlink') {
      runSequence('watch:start', 'clean:styles', 'build:styles', 'inject:assets');
    } else {
      runSequence('watch:start', 'build:styles', 'inject:assets');
    }
  });

  // process typescript
  gulp.watch(['src/app/**/*.ts', '!src/app/**/*.spec.ts'], function(event){
    if (event.type === 'unlink') {
      runSequence('watch:start', 'clean:scripts', 'build:scripts', 'inject:assets');
    } else {
      runSequence('watch:start', 'build:scripts', 'inject:assets');
    }
  });

  // process tests
  gulp.watch(['src/app/**/*.spec.ts'], function(event){
    if (event.type === 'unlink') {
      runSequence('watch:start', 'clean:tests', 'compile:ts', 'test');
    } else {
      runSequence('watch:start', 'compile:ts', 'test');
    }
  });

  // process html
  gulp.watch(['src/app/**/*.html', 'src/index.html'], function(event){
    if (event.type === 'unlink') {
      runSequence('watch:start', 'clean:html', 'build:html');
    } else {
      runSequence('watch:start', 'build:html');
    }
  });
});
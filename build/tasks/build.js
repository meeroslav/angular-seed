var gulp = require('gulp');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');

gulp.task('build', function(done){
    console.info('');
    console.info(gutil.colors.bgCyan('               ______                       __  '));
    console.info(gutil.colors.bgCyan(' .-----.-----.|__    |.-----.-----.-----.--|  | '));
    console.info(gutil.colors.bgCyan(' |     |  _  ||    __||__ --|  -__|  -__|  _  | '));
    console.info(gutil.colors.bgCyan(' |__|__|___  ||______||_____|_____|_____|_____| '));
    console.info(gutil.colors.bgCyan('       |_____|                                  '));
    console.info(gutil.colors.bgCyan('                                    ........    '));
    console.info('');

    return runSequence(
        'clean',
        ['copy', 'build:styles', 'build:scripts', 'build:configs'],
        ['build:healthPage', 'build:html'],
        'coverage',
        done
    );
});
var gulp = require('gulp');                     // main gulp
var path = require('../paths');

var jsoncombine = require('gulp-jsoncombine');
var merge = require('merge2');

// copy images
gulp.task('copy:images', function(){
	return gulp.src('src/assets/images/**/*.*')
		.pipe(gulp.dest('dist/assets/images/'));
});

// copy fonts
gulp.task('copy:fonts', function(){
	return gulp.src('src/assets/styles/fonts/**/*.*')
		.pipe(gulp.dest('dist/assets/styles/fonts/'));
});

function processKey(key, lang) {
    return key.slice(0, -lang.length - 1);
}

function compileLanguage(lang) {
    return gulp.src('src/assets/locales/**/' + lang + '.json')
        .pipe(jsoncombine(lang + '.json', function (data) {
            // move every child except for 'lang' to 'lang' node, return without lang
            Object.keys(data).forEach(function(key) {
                if (key !== lang) {
                    data[lang][processKey(key, lang)] = data[key];
                }
            });
            return new Buffer(JSON.stringify(data[lang]));
        }))
        .pipe(gulp.dest('dist/assets/locales'));
}

// copy locales
gulp.task('copy:locales', function () {
    var tasks = [];
    path.languages.forEach(function (lang) {
        tasks.push(compileLanguage(lang));
    });
    return merge.apply(this, tasks);
});

gulp.task('copy:webconfig', function(){
	return gulp.src('src/web.config')
		.pipe(gulp.dest('dist/'));
});

gulp.task('copy', ['copy:images', 'copy:fonts', 'copy:locales', 'copy:webconfig']);
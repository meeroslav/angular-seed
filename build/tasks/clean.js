var gulp = require('gulp');                     // main gulp
var del = require('del');                       // remove old files

var path = require('../paths');

// remove all
gulp.task('clean', function () {
	return del(path.clean.all);
});
// remove compiled js
gulp.task('clean:scripts', function () {
	return del(path.clean.scripts);
});
// remove compiled tests
gulp.task('clean:tests', function () {
	return del(path.clean.tests);
});
// remove compiled styles
gulp.task('clean:styles', function () {
	return del(path.clean.styles);
});
// remove compiled html
gulp.task('clean:html', function () {
	return del(path.clean.html);
});
// remove images
gulp.task('clean:images', function () {
	return del(path.clean.images);
});
// remove fonts
gulp.task('clean:fonts', function () {
	return del(path.clean.fonts);
});
// remove translations
gulp.task('clean:locales', function () {
	return del(path.clean.locales);
});
gulp.task('clean:internalAssets', function(){
	return del(path.clean.internalAssets);
});
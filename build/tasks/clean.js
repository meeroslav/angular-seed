var gulp = require('gulp');                     // main gulp
var del = require('del');                       // remove old files

var path = require('../paths');

// remove all
gulp.task("clean", function () {
	return del.sync(path.clean.all);
});
// remove compiled js
gulp.task("clean:scripts", function () {
	return del.sync(path.clean.scripts);
});
// remove compiled tests
gulp.task("clean:tests", function () {
	return del.sync(path.clean.tests);
});
// remove compiled styles
gulp.task("clean:styles", function () {
	return del.sync(path.clean.styles);
});
// remove compiled html
gulp.task("clean:html", function () {
	return del.sync(path.clean.html);
});
// remove images
gulp.task("clean:images", function () {
	return del.sync(path.clean.images);
});
// remove fonts
gulp.task("clean:fonts", function () {
	return del.sync(path.clean.fonts);
});
// remove translations
gulp.task("clean:locales", function () {
	return del.sync(path.clean.locales);
});
gulp.task("clean:internalAssets", function(){
	return del.sync(path.clean.internalAssets);
});
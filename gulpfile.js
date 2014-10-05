var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('tests', function() {
	return gulp.src('test/**/*Tests.js', {read: false})
		.pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watch-tests', function() {
	gulp.watch(['src/**', 'test/**'], ['tests']);
});

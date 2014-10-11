var gulp = require('gulp'),
	mocha = require('gulp-mocha'),
	usemin = require('gulp-usemin'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	rimraf = require('gulp-rimraf');

gulp.task('tests', function() {
	return gulp.src('test/**/*Tests.js', {read: false})
		.pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watch-tests', function() {
	gulp.watch(['src/**', 'test/**'], ['tests']);
});

gulp.task('template', ['minify'], function() {
	return gulp.src('src/public/layout.src.hbs')
		.pipe(rimraf())
		.pipe(rename('layout.hbs'))
		.pipe(gulp.dest('src/views'));
});

gulp.task('minify', function() {
	return gulp.src('src/views/layout.src.hbs')
		.pipe(usemin({
			assetsDir: './',
			css: [minifyCss(), 'concat'],
			js: [uglify(), 'concat']
		}))
		.pipe(gulp.dest('src/public'));
});

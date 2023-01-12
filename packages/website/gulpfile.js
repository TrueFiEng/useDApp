var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass')(require('sass')),
	minify = require('gulp-minify')

gulp.task('sass', function () {
	return gulp.src('src/sass/**/*.sass')
		.pipe(sass())
		.pipe(autoprefixer([
			'last 10 versions'
		], {
			cascade: true
		}))
		.pipe(gulp.dest('src/css/'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false
	});
});

gulp.task('img', function () {
	return gulp.src('src/img/**/*')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('video', function () {
	return gulp.src('src/video/**/*')
		.pipe(gulp.dest('dist/video'));
});

gulp.task('min-js', function () {
	return gulp.src('src/js/*.js')
		.pipe(minify({
			noSource: true,
			ext: {
				min: '.min.js'
			},
			ignoreFiles: ['min.js']
		}))
		.pipe(gulp.dest('src/js/min'))
});

gulp.task('watch', function () {
	gulp.watch('src/sass/**/*.sass', gulp.parallel('sass'));
	// gulp.watch('src/js/*.js', gulp.parallel('min-js'));
	gulp.watch('src/js/*.js').on('change', gulp.parallel('min-js'), browserSync.reload);
	gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('prebuild', async function () {

	var buildCss = gulp.src('src/css/**/*')
		.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('src/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('src/*.html')
		.pipe(gulp.dest('dist'));

});

gulp.task('build', gulp.parallel('prebuild', 'img', 'video', 'sass', 'min-js'));

gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'min-js'));










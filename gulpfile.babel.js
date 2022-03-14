require('@babel/register');
import { src, dest, watch, series, parallel } from 'gulp';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartsass);
const browsersync = require('browser-sync').create();
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import gulpAutoprefixer from 'gulp-autoprefixer';

// Scss -> CSS Task
gulp.task('compileScss', () => {
	return src('app/sass/**/*.scss', { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([cssnano()]))
		.pipe(gulpAutoprefixer())
		.pipe(dest('dist', { sourcemaps: '.' }));
});

// Browser-Sync Task
gulp.task('browserSyncServe', cb => {
	browsersync.init({
		server: {
			baseDir: '.',
		},
	});
	cb();
});

// Browser Reload Task
gulp.task('browserReload', cb => {
	browsersync.reload();
	cb();
});

// Watch Task
gulp.task('watchTask', () => {
	watch('*.html', task(browserReload));
	watch('app/sass/**/*.scss', parallel(task(compileScss), task(browserReload)));
});

exports.default = series(task(compileScss), task(browserSyncServe), task(watchTask));

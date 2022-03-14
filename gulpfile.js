const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();

// Sass -> CSS Task
function compileScss() {
	return src("app/sass/**/*.scss", { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([cssnano(), autoprefixer()]))
		.pipe(dest("dist", { sourcemaps: "." }));
}

// Browser-Sync Task
function browserSyncServe(cb) {
	browsersync.init({
		server: {
			baseDir: ".",
		},
	});
	cb();
}

// Browser Reload Task
function browserReload(cb) {
	browsersync.reload();
	cb();
}

// Watch Tasks
function watchTask() {
	watch("*.html", browserReload);
	watch("app/sass/**/*.scss", series(compileScss, browserReload));
}

// default Task
exports.default = series(compileScss, browserSyncServe, watchTask);

// production
exports.build = compileScss;

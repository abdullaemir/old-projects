const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const htmlmin = require('gulp-htmlmin');

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "build"
        }
    });

    gulp.watch("source/**/*.html").on('change', browserSync.reload);
    gulp.watch("source/js/*.js").on('change', browserSync.reload);
});

gulp.task('html', function() {
    return gulp.src("source/**/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("build/"));
});

gulp.task('styles', function() {
    return gulp.src("source/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src("source/js/**/*.js")
        .pipe(gulp.dest("build/js"));
});

gulp.task('images', function() {
    return gulp.src("source/img/**/*")
        .pipe(gulp.dest("build/img"));
});

gulp.task('icons', function() {
    return gulp.src("source/icons/**/*")
        .pipe(gulp.dest("build/icons"));
});

gulp.task('watch', function() {
    gulp.watch("source/**/*.html").on('change', gulp.parallel('html'));
    gulp.watch("source/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("source/js/**/*.js").on('change', gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel('server', 'html', 'styles', 'scripts', 'images', 'icons', 'watch'));
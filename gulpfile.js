const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');
const uglyfile = require('gulp-uglify');
const browserSync = require('browser-sync');

gulp.task('reload', function(){
    browserSync.reload();
});

gulp.task('sass', function(){
    return gulp.src('sass/**/*.scss')
                .pipe(sourcemaps.init())
                .pipe(sass().on('error', sass.logError))
                .pipe(autoprefixer({
                    browsers: ['last 2 versions'],
                    cascade: false,
                }))
                .pipe(sourcemaps.write())
                .pipe(rename('style.css'))
                .pipe(gulp.dest('css'))
                .pipe(browserSync.stream());
});

gulp.task('min-css', function(){
    return gulp.src('./css/**/*.css')
                .pipe(cleanCss())
                .pipe(rename('style.min.css'))
                .pipe(gulp.dest('./css'));
});

gulp.task('ugly-js', function(){
    return gulp.src('./js/**/*.js')
                .pipe(uglyfile())
                .pipe(rename('main.ugly.js'))
                .pipe(gulp.dest('./js'));
});

gulp.task('run', ['sass'], function(){
    browserSync({
        server: './'
    });
    gulp.watch('./*.html', ['reload']);
    gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('default', ['run']);
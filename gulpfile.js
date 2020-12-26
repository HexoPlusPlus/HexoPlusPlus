const gulp = require('gulp')
const uglify = require('gulp-uglify-es').default
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')

const minify_css = () => (
    gulp.src('src/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/'))
);



const minify_js = () => (
    gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
);

module.exports = {
    minify_css: minify_css,
    concat_js: concat_js,
    minify_js: minify_js
};

gulp.task('dist', gulp.parallel(
    minify_css,
    gulp.series(
        minify_js
    )
))

gulp.task('default', gulp.series('dist'));

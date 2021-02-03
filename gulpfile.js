const { task, src, dest, series } = require('gulp')
const minifycss = require('gulp-minify-css')
const terser = require('gulp-terser')

const css = function () {
    return src(['src/*.css'])
        .pipe(minifycss())
        .pipe(dest('dist'))
        .pipe(minifycss())
}
css.displayName = 'minifycss'
task(css);

const js = function () {
    return src(['src/**/*.js','index.js'])
        .pipe(terser())
        .pipe(dest('dist'))
        .pipe(terser())
}
js.displayName = 'minifyjs'
task(js)



task('default', series(['minifycss','minifyjs']))

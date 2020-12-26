const { task, src, dest, series } = require('gulp')
const minifycss = require('gulp-minify-css')
const terser = require('gulp-terser')

const css = function () {
    return src('src/*.css')
        .pipe(minifycss())
        .pipe(dest('dist'))
        .pipe(minifycss())
}
css.displayName = 'minifycss'
task(css);

const js = function () {
    return src(['src/**/*.js'])
        .pipe(terser())
        .pipe(dest('dist'))
        .pipe(terser())
}
js.displayName = 'minifyjs'
task(js)

const copyIndex = function () {
    return src('index.js')
        .pipe(dest('dist'))
}
copyIndex.displayName = 'copyindexjs'
task(copyIndex)

const copyUpdate = function () {
    return src('update.js')
        .pipe(dest('dist'))
}
copyUpdate.displayName = 'copyupdatejs'
task(copyUpdate)

task('copy', series(['copyindexjs','copyupdatejs']))

task('default', series(['minifycss','minifyjs', 'copy']))

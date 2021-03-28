const { task, src, dest, series } = require('gulp')
const concat = require('gulp-concat')
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
    return src(['src/*.js'])
        .pipe(terser())
        .pipe(dest('dist'))
        .pipe(terser())
}
js.displayName = 'minifyjs'
task(js)

const user_talk = function () {
    return src(['src/plugin/marked.js','src/talk_user.js'])
        .pipe(concat('talk_user.js'))
		.pipe(terser())
        .pipe(dest('dist'))
        .pipe(terser())
}
user_talk.displayName = 'user_talk'
task(user_talk)

const talk = function () {
    return src(['src/plugin/marked.js','src/plugin/OwO.js','src/talk.js'])
        .pipe(concat('talk.js'))
		.pipe(terser())
        .pipe(dest('dist'))
        .pipe(terser())
}
talk.displayName = 'talk'
task(talk)

const edit = function () {
    return src(['src/plugin/marked.js','src/plugin/OwO.js','src/edit.js'])
        .pipe(concat('edit.js'))
		.pipe(terser())
        .pipe(dest('dist'))
        .pipe(terser())
}
edit.displayName = 'edit'
task(edit)

task('default', series(['minifycss','minifyjs','user_talk','talk','edit']))

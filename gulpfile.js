const { task, src, dest, series } = require('gulp')
const concat = require('gulp-concat')
const minifycss = require('gulp-minify-css')
const terser = require('gulp-terser')




task('default', series([
    () => {
        return src(['src/js/error.js'])
            .pipe(concat('error.js'))
            .pipe(terser())
            .pipe(dest('dist/error'))
            .pipe(terser())
    },
    () => {
        return src(['src/css/error.css', 'src/css/font/error.css'])
            .pipe(concat('error.css'))
            .pipe(minifycss())
            .pipe(dest('dist/error'))
            .pipe(minifycss())
    },



    () => {
        return src(['src/js/lib/md5.js', 'src/js/login.js'])
            .pipe(concat('login.js'))
            .pipe(terser())
            .pipe(dest('dist/login'))
            .pipe(terser())
    },
    () => {
        return src(['src/css/login.css'])
            .pipe(minifycss())
            .pipe(dest('dist/login'))
            .pipe(minifycss())
    },


    () => {
        return src(['src/css/font/dash.css', 'src/css/material-dashboard/dark.css', 'src/css/theme/dark.css'])
            .pipe(concat('dark.css'))
            .pipe(minifycss())
            .pipe(dest('dist/dash/theme'))
            .pipe(minifycss())
    },
    () => {
        return src(['src/css/font/dash.css', 'src/css/material-dashboard/light.css', 'src/css/theme/light.css'])
            .pipe(concat('light.css'))
            .pipe(minifycss())
            .pipe(dest('dist/dash/theme'))
            .pipe(minifycss())
    },

    () => {
        return src(['src/js/lib/jq.js', 'src/js/material-dashboard/dash.js'])
            .pipe(concat('dash.js'))
            //.pipe(terser())
            .pipe(dest('dist/dash/theme'))
        //.pipe(terser())
    }

]))



/*
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
*/

/*const dash_dark =  () => {
    return src(['src/css/material-dashboard/dark.css'])
        .pipe(minifycss())
        .pipe(dest('dist'))
        .pipe(minifycss())
}
*/
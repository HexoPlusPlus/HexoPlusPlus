var gulp = require('gulp');
var miner = require("gulp-uglify")
gulp.task('default', function(cb) {
	gulp.watch("mi")
	cb();
});

gulp.task('mi',function(cb){
	gulp.src("./src/*.js")
	.pipe(miner())
	.pipe(gulp.dest("./dist/"))
	cb();
})

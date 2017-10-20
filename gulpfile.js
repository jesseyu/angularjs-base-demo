var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open  = require('open');
var ngAnnotate = require('gulp-ng-annotate'); //gulp-ng-annotate 解决angular中注入参数被压缩后出现问题
var rev = require('gulp-rev');                                  //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');				//- 路径替换

var app = {  //预设编译目录
	srcPath:'src/',
	devPath:'build/',
	prdPath:'dist/'
};

//需要编译的文件
gulp.task('lib',function(){
	gulp.src('bower_components/**/*.js')
		.pipe(gulp.dest(app.devPath + 'vendor'))
		.pipe(gulp.dest(app.prdPath + 'vendor'))
		.pipe($.connect.reload());
	gulp.src('bower_components/**/**.css')
		.pipe(gulp.dest(app.devPath + 'vendor'))
		.pipe(gulp.dest(app.prdPath + 'vendor'))
		.pipe($.connect.reload());
	gulp.src('bower_components/bootstrap/less/bootstrap.less')
		.pipe($.plumber())
		.pipe($.less())
		.pipe(gulp.dest(app.devPath + 'vendor/bootstrap'))
		.pipe($.cssmin())
		.pipe(gulp.dest(app.prdPath + 'vendor/bootstrap'))
		.pipe($.cssmin())
		.pipe($.connect.reload());
})

gulp.task('html',function(){
	gulp.src(app.srcPath + '**/*.html')
		.pipe(gulp.dest(app.devPath))
		.pipe(gulp.dest(app.prdPath))
		.pipe($.connect.reload());
})

gulp.task('json',function(){
	gulp.src(app.srcPath + 'data/**/*.json')
		.pipe(gulp.dest(app.devPath + 'data'))
		.pipe(gulp.dest(app.prdPath + 'data'))
		.pipe($.connect.reload());
})

gulp.task('css',function(){
	gulp.src(app.srcPath + 'style/app.css')
		.pipe($.plumber())
		.pipe(gulp.dest(app.devPath + 'css'))
		.pipe($.cssmin())
		.pipe(gulp.dest(app.prdPath + 'css'))
		.pipe($.connect.reload());
	gulp.src(app.srcPath + 'style/iconfont/**/*')
		.pipe(gulp.dest(app.devPath + 'css/iconfont'))
		.pipe(gulp.dest(app.prdPath + 'css/iconfont'))
		.pipe($.connect.reload());
})

gulp.task('js',function(){
	gulp.src(app.srcPath + 'script/**/*.js')
		.pipe($.plumber())
		.pipe($.concat('app.js'))
		.pipe(gulp.dest(app.devPath + 'js'))
		.pipe(ngAnnotate())
		.pipe($.uglify())
		.pipe(gulp.dest(app.prdPath + 'js'))
		.pipe($.connect.reload());
})

gulp.task('images',function(){
	gulp.src(app.srcPath + 'images/**/*')
		.pipe(gulp.dest(app.devPath + 'images'))
		.pipe($.imagemin())
		.pipe(gulp.dest(app.prdPath + 'images'))
		.pipe($.connect.reload());
})

//清除所有已编译的文件
gulp.task('clean',function(){
	gulp.src([app.devPath,app.prdPath])
		.pipe($.clean())
})

gulp.task('build',['lib','html','json','js','images','css']);

//构建环境&&监听文件
gulp.task('server',["build"],function(){
	$.connect.server({
		root:[app.devPath],
		livereload:true,
		port:9999
	});

	open("http://localhost:9999");

	gulp.watch(app.srcPath + "script/**/*.js",['js']);

	gulp.watch(app.srcPath + "bower_components/**/*.js",['lib']);

	gulp.watch(app.srcPath + "style/**/*.css",['css']);

	gulp.watch(app.srcPath + "data/**/*.json",['json']);

	gulp.watch(app.srcPath + "**/*.html",['html']);

	gulp.watch(app.srcPath + "images/**/*",['images']);

})
//启动服务
gulp.task("default",['server'])

var gulp = require('gulp');
var concat = require('gulp-concat');
var order = require('gulp-order');
var uglify = require('gulp-uglify');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var templateCompiler = require('gulp-ember-template-compiler');
var minifyCSS = require('gulp-minify-css');

var lib = {
    js: [
        './bower_components/jquery/dist/jquery',
        './bower_components/bootstrap/dist/js/bootstrap',
        './bower_components/handlebars/handlebars',
        './bower_components/ember/ember',
        './bower_components/ember-data/ember-data',
        "./bower_components/ember-simple-auth/simple-auth"
    ],
    css: [
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
    ]

};


gulp.task('js', function() {
   gulp.src('./client/app/**/*.js')
       .pipe(order([
           'client/app/config.js',
           'client/app/app.js',
           'client/**/*.js'
       ]))
       .pipe(concat('app.js'))
       .pipe(gulpif(argv.production, uglify()))
       .pipe(gulp.dest('./client/public/build'));
});

gulp.task('hbs', function() {
    gulp.src('./client/app/templates/**/*.hbs')
        .pipe(templateCompiler())
        .pipe(concat('templates.js'))
        .pipe(gulpif(argv.production, uglify()))
        .pipe(gulp.dest('./client/public/build/'));
});

gulp.task('lib', ["minify_simple_auth"], function() {
    var js = lib.js;
    var postfix = argv.productuion ? '.min' : '';

    for (var i in js) {
        js[i] = js[i] + postfix + '.js';
    }

    gulp.src(lib.js)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./client/public/build'));

    gulp.src(lib.css)
        .pipe(concat('lib.css'))
        .pipe(gulp.dest('./client/public/build'));
});

gulp.task('minify_simple_auth', function() {
    if (argv.production) {
        gulp.src("./bower_components/ember-simple-auth/simple-auth.js")
            .pipe(uglify())
            .pipe(gulp.dest("./bower_components/ember-simple-auth/simple-auth.min.js"));
    }
})

gulp.task('app', ['js', 'hbs']);

gulp.task('default', ['app', 'lib']);

gulp.task('watch', ['default'], function() {
    gulp.watch('./client/app/**/*.js', ['js']);
    gulp.watch('./client/app/**/*.hbs', ['hbs']);
});
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
// var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
// var webpack = require('gulp-webpack');
var del = require('del');

//File Paths
const SRC_PATH = './app/';
const DIST_PATH = './public/';
const SCRIPTS_PATH = ['./public/bundle.js'];
const SCSS_PATH = 'app/styles/**/*.scss';
const IMG_PATH = 'tileset/**/*png';

//image-compression
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

// Bootstrap scss source
var bootstrapSass = { in: './node_modules/bootstrap-sass/'
};

// fonts
var fonts = { in: [
    SRC_PATH + 'fonts/*.*',
    bootstrapSass. in + 'assets/fonts/**/*'
  ],
  out: DIST_PATH + 'fonts/'
};

// css source file: .scss files
var scss = { in: SRC_PATH + 'styles/app.scss',
  out: DIST_PATH,
  watch: SRC_PATH + 'scss/**/*',
  sassOpts: {
    outputStyle: 'compressed',
    precison: 3,
    errLogToConsole: true,
    includePaths: [bootstrapSass. in + 'assets/stylesheets']
  }
};

// copy bootstrap required fonts to dest
gulp.task('fonts', function() {
  return gulp.src(fonts. in).pipe(gulp.dest(fonts.out));
});

//Sass
gulp.task('styles', ['fonts'], function() {
  // console.log('Starting styles task');
  return gulp.src(scss. in).pipe(plumber(function(err) {
    console.log('Styles task error\n', err);
    this.emit('end');
  })).pipe(sourcemaps.init()).pipe(sass(scss.sassOpts)).pipe(autoprefixer()).pipe(sourcemaps.write()).pipe(gulp.dest(scss.out)).pipe(livereload());
});

// Scripts
//Webpack bundles the javascript.
//Here we just uglify.
gulp.task('scripts', function() {
  console.log('starting scripts task');
  return gulp.src(SCRIPTS_PATH).pipe(plumber(function(err) {
    console.log('Scripts task error\n', err);
    this.emit('end');
  }))
  // .pipe(sourcemaps.init())
  // .pipe(webpack(require('./webpack.config.js')))
  // .pipe(uglify())
  // .pipe(concat('bundle.js'))
  // .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH)).pipe(livereload());
});

// Images
gulp.task('images', function() {
  return gulp.src(IMG_PATH).pipe(imagemin([
    imagemin.gifsicle(),
    imagemin.jpegtran(),
    imagemin.optipng(),
    imagemin.svgo(),
    imageminPngquant(),
    imageminJpegRecompress()
  ])).pipe(gulp.dest(DIST_PATH + '/images'));
});

gulp.task('clean', function() {
  return del.sync([DIST_PATH + '/**/']);
});

gulp.task('default', [
  'styles', 'scripts'
], function() {
  console.log('Starting default task');
});

gulp.task('watch', ['default'], function() {
  require('./server.js');
  livereload.listen();
  gulp.watch(SCRIPTS_PATH, ['scripts']);
  gulp.watch(SCSS_PATH, ['styles']);
});

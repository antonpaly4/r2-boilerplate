'use strict';

var gulp = require('gulp')
  , gutil = require('gulp-util')
  , rename = require('gulp-rename')
  , css = require('gulp-css')
  , imagemin = require('gulp-imagemin')
  , stylus = require('gulp-stylus')
  , nib = require('nib')
  , prefixer = require('gulp-autoprefixer')
  , csso = require('gulp-csso')
  , concat = require('gulp-concat')
  , webpack = require('webpack')
  , webpackConfig = require('./webpack.config');

gulp.task('default', ['stylus', 'css', 'imagemin', 'fonts', 'webpack'], function() {
  gulp.watch('./src/stylus/**/*.styl', ['stylus']);
  gulp.watch('./src/css/*.css', ['css']);
  gulp.watch('./src/img/**/*', ['imagemin']);
  gulp.watch('./src/fonts/*', ['fonts']);
  gulp.watch('./src/js/**/*.*', ['webpack']);
});

gulp.task('stylus', function(){
  gulp.src('./src/stylus/*.styl')
    .pipe(stylus({
      use: nib()
    }))
    .on('error', gutil.log)
    .pipe(prefixer([
      'Chrome >= 34',
      'Firefox >= 28',
      'Explorer >= 9']))
    .pipe(csso())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('css', function(){
  gulp.src('./src/css/*.css')
    .pipe(css())
    .on('error', gutil.log)
    .pipe(concat('vendor.css'))
    .pipe(csso())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('fonts', function(){
  return gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task('imagemin', function(){
  gulp.src(['./src/img/**/*'])
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('./build/img'));
});

gulp.task('webpack', function(done){
  webpackConfig.plugins = webpackConfig.plugins.concat();

  var compiler = webpack(webpackConfig, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);

    gutil.log('webpack', stats.toString({ colors: true }));

    done();
  })
});
'use strict';

module.exports = function() {
  $.gulp.task('sprite:png', function() {

    var spriteData = $.gulp.src('./source/sprite/*.{png,gif}').pipe($.gp.spritesmith({
      imgPath: '/assets/img/sprite.png',
      imgName: 'sprite.png',
      cssName: 'sprite.css',
      padding: 1,

    }));

    var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
        .pipe($.buffer())
        .pipe($.gp.imagemin())
        .pipe($.gulp.dest($.config.root + '/assets/img'));

    var cssStream = spriteData.css
        //.pipe($.gp.csso())
        //.pipe($.gp.sourcemaps.init())
        //.pipe($.gp.sourcemaps.write())
        .pipe($.gp.rename({ extname: ".scss" }))
        .pipe($.gulp.dest('./source/style/common'));

    return $.merge(imgStream, cssStream);

  })
};

'use strict';

module.exports = function() {
  $.gulp.task('pug', function() {

    let locals = JSON.parse($.fs.readFileSync('./source/content.json', 'utf8'));
    //let locals = require('./source/content.json');

    return $.gulp.src('./source/template/pages/*.pug')
      .pipe($.gp.pug({
          locals:locals,
          pretty: true }))
      .on('error', $.gp.notify.onError(function(error) {
        return {
          title: 'Pug',
          message:  error.message
        }
       }))

      .pipe($.gulp.dest($.config.root));
  });
};

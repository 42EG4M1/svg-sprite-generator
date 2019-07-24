const gulp = require('gulp');
const $    = require('gulp-load-plugins')();

const dir = {
 src  : './src/svg/',
 dest : './dist/images/'
}

gulp.task('svg', (cb) => {

  const paths = {
    svg  : dir.src + '*.svg',
    html : dir.src + '_template.html'
  }

  gulp.src(paths.svg)
  .pipe($.svgmin({
    plugins: [{
      removeViewBox: false
    }]
  }))
  .pipe($.svgstore({ inlineSvg: true }))
  .pipe($.cheerio({
    run: ($, file) => {
      // 不要なタグを削除
      $('style,title,defs').remove();
      // symbolタグ以外のid属性を削除
      $('[id]:not(symbol)').removeAttr('id');
      // Illustratorで付与される「st」と「cls」ではじまるclass属性を削除
      $('[class^="st"],[class^="cls"]').removeAttr('class');
      // svgタグ以外のstyle属性を削除
      $('[style]:not(svg)').removeAttr('style');
      // data-name属性を削除
      $('[data-name]').removeAttr('data-name');
      // fill属性を削除
      $('[fill]').removeAttr('fill');
      // svgタグにdisplay:noneを付与（読み込み時、スプライト全体を非表示にするため）
      $('svg').attr({
        style: 'display:none'
      });

      // _template.htmlに渡すid
      const symbols = $('svg > symbol').map(function() {
        return {
          id: $(this).attr('id')
        };
      }).get();

      // _sample.htmlをルートに生成
      const temp   = require('gulp-template');
      const rename = require('gulp-rename');
      gulp.src(paths.html)
      .pipe(temp({
        inlineSvg: $('svg'),
        symbols: symbols
      }))
      .pipe(rename('_sample.html'))
      .pipe(gulp.dest('./'));
    },
    parserOptions: {
      xmlMode: true
    }
  }))
  .pipe($.rename('sprite.min.svg'))
  .pipe(gulp.dest(dir.dest));
  cb();

});

const gulp = require('gulp');
const $    = require('gulp-load-plugins')();

const dir = {
 src  : './src/assets/images/svg/',
 dest : './dist/assets/images/'
}

gulp.task('svg', () => {

  const paths = {
    svg  : dir.src + '*.svg',
    html : dir.src + '_base.html'
  }

  gulp.src(paths.svg)
  .pipe($.svgmin())
  .pipe($.svgstore({ inlineSvg: true }))
  .pipe($.cheerio(($, file) => {
    // スプライト全体を非表示（読み込み時）
    $('svg').attr({
      style: 'display:none'
    });
    // symbolタグ以外のIDを削除
    $('[id]:not(symbol)').removeAttr('id');
    // （classが重複するため）Illustratorのstyleは使えないので削除
    $('style').remove();
    // Illustratorで付与されるclassを削除
    $('[class ^= "st"]').removeAttr('class');
    // 属性としてfillが使われることはない（ccでは）が念のため削除
    $('[fill]').removeAttr('fill');

    // sample.htmlに渡す変数
    const symbols = $('svg > symbol').map(function() {
      return {
        id: $(this).attr('id')
      };
    }).get();

    // sample.htmlをルートに生成
    const temp   = require('gulp-template');
    const rename = require('gulp-rename');
    gulp.src(paths.html)
    .pipe(temp({
      inlineSvg: $('svg'),
      symbols: symbols
    }))
    .pipe(rename('_sample.html'))
    .pipe(gulp.dest('./'))

  }))

  .pipe($.rename('sprite.min.svg'))
  .pipe(gulp.dest(dir.dest));

});
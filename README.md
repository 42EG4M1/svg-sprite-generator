# svg-sprite-generator

SVGスプライトを自動で生成します。同時にスプライトの一覧が見れるHTMLも作成します。  
Gulpを使用していますが、グローバルへのGulpインストールは不要です。

sample : [https://42eg4m1.github.io/svg-sprite-generator/](https://42eg4m1.github.io/svg-sprite-generator/)


## Getting Started

### 1. clone

プロジェクトディレクトリへ移動してクローン

    $ git clone git@github.com:42EG4M1/svg-sprite-generator.git


### 2. install plugins

各npmプラグインをインストール

    $ npm i


### 3. build

以下のコマンドでタスクを実行して**SVGスプライト**を生成（同時に`_sample.html`も生成される）

    $ npm run gulp


## Output

タスクを実行すると以下の工程が自動で行われます。

- 各SVGファイルを圧縮
- `svg`タグを`symbol`タグに置き換え、ファイル名を`id`にセット
- 各SVGファイルを一つのSVGにまとめ、余分な要素（id、class、style、fill等）を削除
- SVGスプライトの閲覧用HTML（`_sample.html`）を作成

※生成されるSVGスプライトは、インライン用のものとなるので、色（fill）や線（stroke）等は、CSSで調整する必要があります。(CSSの`background`で表示させることはできません)


## How to Use

Illustratorで作成したSVGファイルを`./src/svg/`の中に設置し、`$ npm run build`でタスクを実行するだけです。  

※Adobe Illustrator CCで作成されたSVGファイルを基準としています。  
※基本的に保存方法は問いませんが、`comand + c`でコピーし、エディタの新規ファイルで`command + vで`貼り付けて保存する方法を推奨します。この場合、最終の**空白行**を必ず削除するようにしてください。


### Directory

タスクを実行すると`dist`ディレクトリが作成され、下層の`images`ディレクトリに`sprite.min.svg`が生成されます。  
同時に`_sample.html`がルートに作成されます。

    /
    ├── src/
    │   └── svg/
    │       ├── _template.html
    │       ├── example1.svg
    │       ├── example2.svg
    │       └── ...
    ├── dist/
    │   └── images/
    │       └── sprite.min.svg
    │
    ├── _sample.html
    │
    ├── ...


`_sample.html`には、SVGスプライト化された画像がリスト表示されています。どういった画像が含まれているか一目で確認できるとともに、HTMLへ表示する際の`id`を確認することができます。


### HTML

SVG画像をインラインとしてHTMLに表示する際は、スプライトの`symbol`タグにセットされた`id`を、`use`タグの`xlink`に記載することで表示できます。  
`id`は、スプライト画像の一覧とともに、`_sample.html`に記載されています。  

    [ HTML ]
    <svg class="svg-icon"><use xlink:href="#example1"/></svg>

※上記の方法で表示させる場合は、作成したSVGスプライトをHTMLへ読み込ませる必要があります。読み込み方法等の詳細は、以下のリンク先ページを参考にしてください。  

[外部SVGファイルを非同期で読み込み、インラインのSVGスプライトとして利用する](https://theorthodoxworks.com/web-design/svg-sprite-async-load/)

## Detailed

詳細については、以下のブログに記載しています。

[GulpでSVGスプライトを自動生成する](https://theorthodoxworks.com/front-end/svg-sprite-generator-with-gulp/)

## License
MIT License

## Update
19.07.24 gulp4対応（パッケージ更新）
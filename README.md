# svg-sprite-generator

SVGスプライトを自動で生成します。同時にスプライトの一覧が見れるHTMLも作成します。  
Gulpを使用していますが、グローバルへのGulpインストールは不要です。


## Require

- node.js


## Getting Started

### 1. clone

プロジェクトディレクトリへ移動してクローン

    $ git clone git@github.com:42EG4M1/svg-sprite-generator.git


### 2. install npm packages

パッケージをインストール

    $ npm i


### 3. build

以下のコマンドでタスクを実行（watchなし）

    $ npm run build


## Output

タスクを実行すると以下の工程が自動で行われます。

- 各SVGファイルを圧縮
- `svg`タグを`symbol`タグに置き換え、ファイル名を`id`にセット
- 各SVGファイルを一つのSVGにまとめ、余分な要素（id、class、style、fill等）を削除
- スプライトのリスト（`_sample.html`）を作成

※生成されるSVGスプライトは、HTML用（インライン用）のもので、色（fill）や線（stroke）等は、CSSで調整する必要があります。(CSSの`background`で表示させることはできません)


## How to Use

Illustratorで作成したSVGファイルを`./src/assets/images/svg/`の中に設置し、`$ npm run build`でタスクを実行するだけです。  

※Illustratorで作成されたSVGファイルを基準としています。  
※SVGファイルを作成する際、Illustrator上で`command+c`して、エディタの新規ファイルで`command+v`した場合、最終__空白行__の削除を行ってください。


### Directory

タスクを実行するとdistディレクトリが作成され、下層のimagesディレクトリに`sprite.min.svg`が生成されます。  
同時に`_sample.html`がルートに作成されます。

    /
    ├── src
    │   └── assets
    │       └── images
    │           └── svg
    │               ├── _base.html
    │               ├── example1.svg
    │               ├── example2.svg
    │               └── ...
    ├── dist
    │   └── assets
    │       └── images
    │           └── sprite.min.svg
    │
    ├── _sample.html
    │
    ├── ...


`_sample.html`には画像の一覧が表示されます。スプライトに含めた画像を一目で確認できるとともに、HTMLへ表示する際の`id`を確認することができます。


### HTML

SVG画像をインラインとしてHTMLに表示する際は、スプライトの`symbol`タグにセットされた`id`を、`use`タグの`xlink`に記載することで表示できます。  
`id`は、スプライト画像の一覧とともに、`_sample.html`に記載されています。  

    [ HTML ]
    <svg class="svg-icon"><use xlink:href="#example1"/></svg>

※上記の方法で表示させる場合は、作成したSVGスプライトをHTMLへ読み込ませる必要があります。読み込み方法等の詳細は、以下のリンク先ページを参考にしてください。  

[外部SVGファイルを非同期で読み込み、インラインのSVGスプライトとして利用する](http://theorthodoxworks.com/web-design/svg-sprite-async-load/)

## License
MIT License
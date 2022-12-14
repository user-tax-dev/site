import {
  minify
} from 'html-minifier-terser';

export var INDEX_HTML = 'index.html';

export default {
  name: 'mini_html',
  apply: 'build',
  enforce: 'post',
  generateBundle: async(_, bundle) => {
    var fileName, html, i, li, map, name, prefix, prefix_len, x;
    li = Object.values(bundle);
    map = new Map();
    prefix = '../file/';
    prefix_len = prefix.length;
    for (x of li) {
      ({name, fileName} = x);
      if (!name) {
        continue;
      }
      if (name.startsWith(prefix)) {
        map.set(name.slice(prefix_len), fileName);
      }
    }
    for (i of li) {
      if (i.type === 'asset' && /\.html?$/.test(i.fileName)) {
        //if INDEX_HTML == i.fileName
        //  i.fileName = INDEX_HTML[...-1]
        html = (await minify(i.source, {
          collapseWhitespace: true,
          html5: true,
          minifyCSS: true,
          minifyJS: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }));
        i.source = html;
      }
    }
  }
};

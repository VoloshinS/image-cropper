const webpack = require('webpack');

const provide = new webpack.ProvidePlugin({
  React: 'react',
  $: 'jquery',
  jQuery: 'jquery'
});

const uglify = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
});

module.exports = (NODE_ENV) => {
  const COMMON_PLUGINS = [
    provide
  ];

  const PLUGINS_FOR_ENV = {
    development: [
    ],
    production: [
      uglify
    ],
    analyze: [
      uglify
    ],
    test: []
  };

  return COMMON_PLUGINS.concat(PLUGINS_FOR_ENV[NODE_ENV]);
}

const webpack = require('webpack');

module.exports = {
  context: __dirname + '/src',
  entry: {
    app: './app.js'
  },
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  devServer: {
    open: true,
    contentBase: __dirname + '/src'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [ 'babel-preset-react', 'babel-preset-es2015' ]
        }
      },
      {
        test: /\.less$/,
        loaders: [ 'style-loader', 'css-loader', 'less-loader' ]
      },
      {
        test: /\.css$/,
        loaders: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        loader: 'url-loader',
        query: {
          options: {
            limit: 10000
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}

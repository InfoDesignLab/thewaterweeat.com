var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var langs = require('./src/js/langs.js')
var prod = process.argv.indexOf('-p') !== -1

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/main-[hash].js',
    chunkFilename: 'js/[name]-[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  externals: {
    'jquery': 'jQuery'
  },
  module: {
    loaders: [
      { test: /js\/.+\.js$/, loader: 'babel-loader', query: { presets: ['es2015'] } },
      { test: /\/_[^\/]+\.html$/, loader: 'html-loader?interpolate' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
      { test: /\.ico$/i, loader: 'file-loader?name=[name].[ext]' },
      { test: /images\/.+\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=images/[name]-[hash:6].[ext]' },
      { test: /static\/.+\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=static/[name]-[hash:6].[ext]' },
      { test: /download\/.+\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=download/[name]-[hash:6].[ext]' }, // XXX: not working
      { test: /thumb\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=[name].[ext]' },
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/styles-[contenthash:6].css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new HtmlWebpackPlugin({
      filename: '.htaccess',
      template: './src/.htaccess',
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: 'robots.txt',
      templateContent: prod ? 'User-agent: *' : 'User-agent: *\nDisallow: /',
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: 'humans.txt',
      template: './src/humans.txt',
      inject: false
    }),
    ...Object.keys(langs).map((lang) => {
      if (lang === 'en') {
        return new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/index.html',
          inject: true
        });
      } else {
        return new HtmlWebpackPlugin({
          filename: lang + '/index.html',
          template: './src/index.' + lang + '.html',
          inject: true
        });
      }
    }),
  ]
};

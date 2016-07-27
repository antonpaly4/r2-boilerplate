'use strict';

var path = require('path')
  , webpack = require('webpack');

var staticPath = path.resolve(__dirname, 'source')
  , buildPath = path.resolve(__dirname, 'build')
  , vendorPath = path.join(__dirname, 'node_modules');

module.exports = {

  cache: true,

  context: staticPath,

  entry: {
    app: path.join(staticPath, 'js/app.jsx')
  },

  output: {
    path: path.join(buildPath, '/js'),
    filename: '[name].bundle.js',
    chunkFilname: '[id].bundle.js'
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.html$/, loader: 'raw'},
      { test: /\.jsx?$/, exclude: [
        /node_modules/
      ], loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }}
    ]
  },

  resolve: {
    alias: {
      npm: vendorPath
    },
    extensions: ['', '.js', '.styl', '.css', '.jsx'],
    root: [staticPath, vendorPath]
  },

  plugins: [
    new webpack.ResolverPlugin([
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('package.json', ['main'])
    ]),

    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ],

  devtool: 'eval'
};
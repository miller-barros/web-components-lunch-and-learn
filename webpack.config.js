const { resolve } = require('path');

// PLUGINS
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: resolve(__dirname, 'src', 'index.js'),
  mode: process.env.NODE_ENV || 'development',
  devtool: false,
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
    publicPath: './',
  },
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    writeToDisk: true,
    port: 8000,
  },
  module: {
    rules: [
      {
        test: /\.(css|html)$/,
        exclude: /node_modules/,
        use: 'raw-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      minify: !devMode,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: !devMode,
  },
};

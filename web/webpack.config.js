'use strict';

const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const PUBLIC_DIR = path.resolve(__dirname, 'public');
const DIST_DIR = path.resolve(__dirname, 'dist');

module.exports = () => ({
  entry: ['@babel/polyfill', path.resolve(SRC_DIR, 'index.js')],
  output: {
    path: DIST_DIR,
    filename: 'app.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: 'upward',
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              localsConvention: 'camelCase',
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              prependData: `@import 'abstracts';`,
              sassOptions: {
                includePaths: [path.resolve(SRC_DIR, 'style')],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf)$/,
        loader: 'url-loader',
      },
    ],
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    publicPath: '/',
    contentBase: SRC_DIR,
    open: true,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:3001/api/v1',
        pathRewrite: { '^/api/v1': '' },
      },
    },
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(SRC_DIR, 'static'),
        to: 'static',
        toType: 'dir',
      },
    ]),
    new HtmlWebpackPlugin({
      template: path.resolve(PUBLIC_DIR, 'index.html'),
      favicon: path.resolve(PUBLIC_DIR, 'favicon.ico'),
    }),
  ],
  resolve: {
    alias: {
      components: path.resolve(SRC_DIR, 'components'),
      containers: path.resolve(SRC_DIR, 'containers'),
      hooks: path.resolve(SRC_DIR, 'hooks'),
      router: path.resolve(SRC_DIR, 'router'),
      static: path.resolve(SRC_DIR, 'static'),
      store: path.resolve(SRC_DIR, 'store'),
      style: path.resolve(SRC_DIR, 'style'),
      svgs: path.resolve(SRC_DIR, 'svgs'),
      utils: path.resolve(SRC_DIR, 'utils'),
    },
    extensions: ['*', '.js', '.json'],
  },
});

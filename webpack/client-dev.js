const LoadablePlugin = require('@loadable/webpack-plugin')
const WebpackBar = require('webpackbar')

const { serverDevOutputPath, staticDistPath, devPublicPath, resolve, rules } = require('./common')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map', // —slower initial build but fast rebuilds. https://webpack.js.org/configuration/devtool/
  entry: [
    './client/index.tsx',
  ],
  target: 'web',
  output: {
    path: staticDistPath,
    filename: '[name].[hash].js',
    publicPath: devPublicPath,
  },
  module: {
    rules: [
      rules.tsLoader,
      {
        test: rules.cssTest,
        oneOf: [
          {
            resourceQuery: /global/,
            use: [
              { loader: 'style-loader' },
              { loader: 'css-loader', options: { modules: { mode: 'global', localIdentName: rules.localIdentName }, sourceMap: true } },
            ],
          },
          {
            use: [
              { loader: 'style-loader' },
              { loader: 'css-loader', options: { modules: { mode: 'local', localIdentName: rules.localIdentName }, sourceMap: true } },
            ],
          },
        ],
      },
      { test: rules.imgTest, loader: 'url-loader', options: { limit: 10000, name: rules.devFileName } },
      { test: rules.fontTest, loader: 'url-loader', options: { limit: 10000, name: rules.devFileName } },
    ],
  },
  devServer: { // https://webpack.js.org/configuration/dev-server/
    host: 'localhost',
    port: 3001,
    hot: true,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*', // To fix 'Access to XMLHttpRequest at 'http://localhost:3001/...' from origin 'http://localhost:3000' has been blocked by CORS policy'
    },
    noInfo: true,
    quiet: true, // comment out if you're installing some plugins and experience issues to be able to see errors
    // https: true, // uncomment if you want to server assets from https
  },
  plugins: [
    new LoadablePlugin({ writeToDisk: { filename: serverDevOutputPath } }),
    new WebpackBar({
      name: 'client',
    }),
  ],
  resolve,
}

const webpack = require('webpack')
const webpackNodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const { serverProdOutputPath, resolve, prodPublicPath: publicPath, plugins, rules } = require('./common')

module.exports = {
  mode: 'production',
  target: 'node',
  entry: [
    './server/index.tsx',
  ],
  output: {
    path: serverProdOutputPath,
    filename: 'index.js',
    publicPath,
  },
  node: false, // Do not mock __dirname and others, https://webpack.js.org/configuration/node/#node
  module: {
    rules: [
      rules.tsLoader,
      {
        test: rules.cssTest,
        oneOf: [
          { loader: 'css-loader', resourceQuery: /global/, options: { onlyLocals: true } },
          { loader: 'css-loader', options: { onlyLocals: true, modules: { mode: 'local' } } },
        ],
      },
      { test: rules.imgTest,
        use: [
          { loader: 'url-loader', options: { limit: 10000, emitFile: false } },
          'image-webpack-loader',
        ],
      },
      { test: rules.fontTest, loader: 'url-loader', options: { limit: 10000, emitFile: false } },
    ],
  },
  externals: [webpackNodeExternals({ whitelist: plugins.webpackNodeExternalsWhitelist })], // ignore 'node-modules' but process files that match regex in 'whitelist'
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }), // Keep everything in one file on the server
  ],
  resolve,
}

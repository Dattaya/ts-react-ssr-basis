const webpack = require('webpack')
const webpackNodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge').default

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
      rules.mjsLoader,
      merge(rules.tsLoader, {
        use: { options: { envName: 'server' } },
      }),
      {
        test: rules.cssTest,
        oneOf: [
          { loader: 'css-loader', resourceQuery: /global/, options: { modules: { exportOnlyLocals: true } } },
          { loader: 'css-loader', options: { modules: { mode: 'local', exportOnlyLocals: true } } },
        ],
      },
      merge(rules.imgLoader, {
        generator: { emit: false },
      }),
      merge(rules.fontLoader, {
        generator: { emit: false },
      }),
    ],
  },
  externals: [webpackNodeExternals({ allowlist: plugins.webpackNodeExternalsWhitelist })], // ignore 'node-modules' but process files that match regex in 'whitelist'
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }), // Keep everything in one file on the server
  ],
  resolve,
}

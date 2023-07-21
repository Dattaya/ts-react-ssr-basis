const webpack = require('webpack')
const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')
const WebpackShellPlugin = require('webpack-shell-plugin-next')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge').default

const { serverDevOutputPath, devPublicPath, resolve, plugins, rules } = require('./common')

const webpackHotEntry = 'webpack/hot/poll?300'

module.exports = {
  mode: 'development',
  target: 'node',
  watch: true,
  entry: [
    webpackHotEntry,
    './server/index.tsx',
  ],
  output: {
    path: serverDevOutputPath,
    filename: 'server.js',
    publicPath: devPublicPath,
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
          { loader: 'css-loader', resourceQuery: /global/, options: { modules: { mode: 'global', localIdentName: rules.localIdentName, exportOnlyLocals: true } } },
          { loader: 'css-loader', options: { modules: { mode: 'local', localIdentName: rules.localIdentName, exportOnlyLocals: true } } },
        ],
      },
      merge(rules.imgLoader, {
        generator: { filename: rules.devFileName, emit: false },
      }),
      merge(rules.fontLoader, {
        generator: { filename: rules.devFileName, emit: false },
      }),
    ],
  },
  externals: [webpackNodeExternals({
    allowlist: [
      webpackHotEntry,
      ...plugins.webpackNodeExternalsWhitelist, // ignore 'node-modules' but process files that match regex in 'whitelist'
    ],
  })],
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackShellPlugin({ // 'webpack watch: true' runs indefinitely, so to be able to start the server right after the initial build, we need to use this plugin
      onBuildEnd: {
        scripts: [`node ${path.join(__dirname, 'waitUntilLoadableStatsCreated')} && node ${path.join(serverDevOutputPath, 'server.js')}`],
        blocking: false,
        parallel: true,
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }), // Keep everything in one file on the server
  ],
  stats: 'errors-only',
  resolve,
}

const LoadablePlugin = require('@loadable/webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const { serverProdOutputPath, staticDistPath, prodPublicPath: publicPath, resolve, rules } = require('./common')

module.exports = {
  mode: 'production',
  entry: [
    './client/index.tsx',
  ],
  target: 'web',
  output: {
    path: staticDistPath,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath,
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
              MiniCssExtractPlugin.loader,
              { loader: 'css-loader' },
            ],
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              { loader: 'css-loader', options: { modules: { mode: 'local' } } },
            ],
          },
        ],
      },
      {
        test: rules.imgTest,
        use: [
          { loader: 'url-loader', options: { limit: 10000 } },
          'image-webpack-loader',
        ],
      },
      { test: rules.fontTest, loader: 'url-loader', options: { limit: 10000 } },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['advanced', { autoprefixer: { browsers: [">0.2%", "not dead"] }, zindex: false, reduceIdents: false, mergeIdents: false, discardUnused: false }],
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[chunkhash].css',
      chunkFilename: '[chunkhash].chunk.css',
    }),
    new LoadablePlugin({ writeToDisk: { filename: serverProdOutputPath } }),
  ],
  resolve,
}

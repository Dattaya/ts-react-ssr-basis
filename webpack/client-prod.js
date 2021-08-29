const LoadablePlugin = require('@loadable/webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge').default

const { serverProdOutputPath, staticDistPath, prodPublicPath: publicPath, resolve, rules } = require('./common')

const postCssLoader = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: [
        [
          "postcss-preset-env",
          {
            features: {
              'logical-properties-and-values': false, // Otherwise `margin-inline-start` won't not work
            },
          },
        ],
      ],
    },
  },
}

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
      rules.mjsLoader,
      merge(rules.tsLoader, {
        use: { options: { envName: 'client-prod' } },
      }),
      {
        test: rules.cssTest,
        oneOf: [
          {
            resourceQuery: /global/,
            use: [
              MiniCssExtractPlugin.loader,
              { loader: 'css-loader', options: { importLoaders: 1 } },
              postCssLoader
            ],
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              { loader: 'css-loader', options: { modules: { mode: 'local' }, importLoaders: 1 } },
              postCssLoader,
            ],
          },
        ],
      },
      merge(rules.imgLoader, {
        use: ['image-webpack-loader']
      }),
      rules.fontLoader,
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[chunkhash].css',
      chunkFilename: '[chunkhash].chunk.css',
    }),
    new LoadablePlugin({ writeToDisk: { filename: serverProdOutputPath } }),
  ],
  resolve,
}

const path = require('path')

const rootPath = path.join(__dirname, '..')
const prodPublicPath = '/static/dist/'

module.exports = {
  commonConfig: {

  },
  serverProdOutputPath: path.resolve(rootPath, 'server-prod-dist'),
  serverDevOutputPath: path.resolve(rootPath, 'server-dev-dist'),

  staticDistPath: path.resolve(rootPath, 'static', 'dist'),

  devPublicPath: `//localhost:3001${prodPublicPath}`,
  prodPublicPath,

  rules: {
    devFileName: '[name].[hash:8].[ext]',
    localIdentName: '[local]--[hash:base64:3]',
    cssTest: /\.css$/,
    mjsLoader: {
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false, // https://github.com/graphql/graphql-js/issues/2721#issuecomment-723008284
      },
    },
    fontLoader: {
      test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
      type: "asset",
      parser: { dataUrlCondition: { maxSize: 10000 } },
    },
    imgLoader: {
      test: /\.(jpe?g|png|gif)$/,
      type: "asset",
      parser: { dataUrlCondition: { maxSize: 10000 } },
    },
    tsLoader: {
      test: /\.tsx?$/,
      use: {
        loader: 'babel-loader',
      },
      exclude: /node_modules/,
    },
  },

  resolve: {
    alias: {
      // allows for imports like "import App from '@/components/App'" instead of '../../components/App'
      '@': path.join(rootPath, 'common'), // keep in sync with `tsconfig.json`
    },
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
  },

  plugins: {
    webpackNodeExternalsWhitelist: [
      /\.(eot|woff|woff2|ttf|otf)$/,
      /\.(svg|png|jpg|jpeg|gif|ico)$/,
      /\.(mp4|mp3|ogg|swf|webp)$/,
      /\.(css|css\?global|scss|sass|sss|less)$/,
    ],
  },
}

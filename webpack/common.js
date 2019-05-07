const path = require('path')

const rootPath = path.join(__dirname, '..')
const prodPublicPath = '/static/dist/'

module.exports = {
  serverProdOutputPath: path.resolve(rootPath, 'server-prod-dist'),
  serverDevOutputPath: path.resolve(rootPath, 'server-dev-dist'),

  staticDistPath: path.resolve(rootPath, 'static', 'dist'),

  devPublicPath: `//localhost:3001${prodPublicPath}`,
  prodPublicPath,

  rules: {
    devFileName: '[name].[hash:8].[ext]',
    localIdentName: '[local]--[hash:base64:3]',
    cssTest: /\.css$/,
    imgTest: /\.(jpe?g|png|gif)$/,
    fontTest: /\.(eot|svg|otf|ttf|woff|woff2)$/,
    tsLoader: {
      test: /\.tsx?$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    },
  },

  resolve: {
    alias: {
      // allows for imports like "import App from 'components/App'" instead of '../../components/App'
      'components': path.join(rootPath, 'common/components/'), // keep in sync with `tsconfig.json`
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
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

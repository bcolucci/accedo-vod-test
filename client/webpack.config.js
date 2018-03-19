import webpack from 'webpack'
import { resolve, join } from 'path'
import { readFileSync } from 'fs'
import HtmlWebPackPlugin from 'html-webpack-plugin'

const env = process.env.NODE_ENV || 'development'

const babelConf = JSON.parse(readFileSync('.babelrc'))

const webpackConf = {
  mode: env,
  target: 'web',
  entry: {
    style: './src/style.js',
    app: './src/main.js'
  },
  output: {
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: `${__dirname}/src`,
        loader: 'babel-loader',
        query: babelConf
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'font-loader' }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${env}"`,
      'SESSION_KEY': '"vod_sess_id"',
      'API_URL': `'http://${process.env.HOST}:3000'`
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
}

if (env === 'production') {
  babelConf.plugins.push('transform-react-inline-elements')
  babelConf.plugins.push('transform-react-constant-elements')
} else {
  webpackConf.devtool = '#cheap-module-source-map'
}

export default webpackConf

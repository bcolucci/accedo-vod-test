import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'

const env = process.env.NODE_ENV || 'development'

export default {
  mode: env,
  target: 'node',
  entry: './src/start.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: `${__dirname}/src`,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ],
  externals: [
    nodeExternals()
  ]
}

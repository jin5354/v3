const path = require('path')
const webpack = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    'app': path.resolve(__dirname, '../src/index.ts')
  },
  output: {
    libraryTarget: 'umd',
    library: 'v3',
    filename: 'v3.min.js',
    path: path.resolve(__dirname, '../dist'),
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(ts(x?)|js(x?))$/,
        exclude: /node_modules/,
        use: [
            'babel-loader',
            'ts-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  plugins: [
    new CleanPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
    })
  ]
}
const nodeExternals = require('webpack-node-externals')
const path = require('path')

const rules = [{
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  loader: 'babel-loader',
  query: {
    presets: ['es2015', 'react']
  }
}]

const client = {
  entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, './dist/public'),
    filename: 'bundle.js'
  },
  module: {
    rules
  },
  mode: 'production'
}

const server = {
  entry: './src/server.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'server.js'
  },
  module: {
    rules
  },
  target: 'node',
  mode: 'production',
  externals: [nodeExternals()]
}

module.exports = [client, server]

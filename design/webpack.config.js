const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './index.js',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules'
      // options: {
      //   modules: true,
      //   localIdentName: '[local]--[hash:base64:5]'
      // }
    }]
  },
  plugins: [new HtmlWebpackPlugin()]
}

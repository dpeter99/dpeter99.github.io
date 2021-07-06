const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',  
  devtool: 'eval-source-map',
  watch: true,

  context: path.resolve(__dirname, '../src'),
  entry: {
    app: [
      './scss/main.scss'
    ]
  },
  plugins: [
    new MiniCssExtractPlugin
  ],
  output: {
    path: path.resolve(__dirname, '../assets')
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader' 
          },
          {
            loader: 'sass-loader' 
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}
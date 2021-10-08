// Generated using webpack-cli https://github.com/webpack/webpack-cli

const isProduction = process.env.NODE_ENV == "production";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './**/*.ejs', context: "./src"},
        { from: './**/*.html', context: "./src"}
      ]
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        use: ["source-map-loader","ts-loader"],
        exclude: ["/node_modules/"],
      },
      {
        test: /\.s[ac]ss$/i,
        oneOf:[
          {
            resourceQuery: "?lit",
            use: ['lit-scss-loader','extract-loader', "css-loader", "postcss-loader", "sass-loader"],
          },
          {
            use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"],
          }
        ]
        
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

console.log("is prod: " + isProduction);

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    
    //config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
    config.devtool = "source-map";
    //config.watch = true
  }
  return config;
};

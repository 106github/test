const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html" }]),
    new webpack.DefinePlugin({
      'process.env.PRIVATE_KEY': JSON.stringify('18cd85207759baab0ecdbe0ecb668e4e2ca94057e5bc2c175c60bbd47272ee6d')
  }),
  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};

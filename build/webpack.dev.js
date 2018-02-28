const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const {
 CLIENT_CONFIG,
 SERVER_CONFIG
} = require("./webpack.common");

const DEV_CLIENT_CONFIG = merge(CLIENT_CONFIG(), {
 output: {
  publicPath: path.resolve(__dirname, "../.bin") 
 },

 plugins: [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
 ]
});

module.exports = [
 DEV_CLIENT_CONFIG,
 SERVER_CONFIG()
];

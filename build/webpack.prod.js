const webpack = require("webpack");
const merge = require("webpack-merge");
const {
 CLIENT_CONFIG,
 SERVER_CONFIG
} = require("./webpack.common");

const PROD_CLIENT_CONFIG = merge(CLIENT_CONFIG(true), {
 bail: true,
 plugins: [
  new webpack.optimize.UglifyJsPlugin({
   comments: false,
   dropDebugger: true,
   dropConsole: true,
   compressor: {
    warnings: false,
   }
  })
 ]
});

module.exports = [
 PROD_CLIENT_CONFIG,
 SERVER_CONFIG(true)
];

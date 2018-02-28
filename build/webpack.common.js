const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const glob = require("glob");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
const nodeExternals = require("webpack-node-externals");
const packageJSON = require("../package.json");

const PROJECT_NAME = "shopin-ico-web";

const COMMON_CONFIG = isProd => {
  const plugins = [
    new ExtractTextPlugin("[name].bundle.css")
  ];

  if (isProd) {
    /* plugins.push(new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.CDN_LINK": JSON.stringify("//prod.shopin.com"),
      "process.env.ICO_Endpoint": JSON.stringify("http://api.shopin.com")
    })); */
    plugins.push(new OptimizeCSSPlugin());
    plugins.push(new PurifyCSSPlugin({
      verbose: true,
      minimize: true,
      paths: glob.sync(`src/client/**/*.tsx`),
      styleExtensions: [".css"]
    }));
  }

  return {
    devtool: "source-map",
    resolve: {
      extensions: [".ts", ".tsx", ".es6", ".js", ".json"],
      alias: {
        client: path.resolve(__dirname, "../src/client/"),
        server: path.resolve(__dirname, "../src/server/"),
        assets: path.resolve(__dirname, "../src/assets/"),
        components: path.resolve(__dirname, "../src/client/components/"),
        containers: path.resolve(__dirname, "../src/client/containers/"),
        services: path.resolve(__dirname, "../src/core/services"),
        core: path.resolve(__dirname, "../src/core/"),
        store: path.resolve(__dirname, "../src/core/store/"),
        theme: path.resolve(__dirname, "../src/client/theme")
      }
    },
    module: {
      rules: [
        { test: /\.ts$|\.tsx$/, exclude: /node_modules/, use: ["awesome-typescript-loader"] },
        { test: /\.json$/, loader: "json-loader" },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [{
              loader: "css-loader",
              options: {
                importLoaders: 1
              },
            }, "postcss-loader"]
          })
        }, {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'url-loader?limit=1'
        },
      ]
    },
    context: path.resolve(__dirname, "../"),
    plugins
  };
};

const CLIENT_CONFIG = isProd => merge(COMMON_CONFIG(isProd), {
  target: "web",
  entry: "./src/client",
  output: {
    path: path.resolve(__dirname, "../.bin/static/"),
    filename: `${PROJECT_NAME}.browser.js`,
    publicPath: "http://localhost:4080/"
  },
  plugins: [
    new CopyWebpackPlugin([{
      context: "./src",
      from: "./assets/**/*",
      to: "./"
    }]),
    new CopyWebpackPlugin([{
      context: "./src/client",
      from: "./service-worker.js",
      to: "./"
    }]),
    new CopyWebpackPlugin([{
      context: "./src/client",
      from: "./manifest.json",
      to: "./"
    }])
  ]
});

const SERVER_CONFIG = isProd => merge(COMMON_CONFIG(isProd), {
  target: "node",
  entry: "./src/server",
  output: {
    path: path.resolve(__dirname, "../.bin/"),
    filename: `${PROJECT_NAME}.server.js`
  },
  externals: [nodeExternals()],
  node: {
    global: true,
    __dirname: false,
    __filename: true,
    process: true,
    Buffer: false
  }
});

module.exports = {
  CLIENT_CONFIG,
  SERVER_CONFIG
};

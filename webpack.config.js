const path = require("path");
const SRC_DIR = path.resolve(__dirname, "src");
const PUBLIC_DIR = path.resolve(__dirname, "public");

const shared = {
  entry: path.resolve(SRC_DIR, "index.js"),
  output: {
    path: path.resolve(PUBLIC_DIR, "scripts"),
    publicPath: "/scripts/",
    filename: "index.js",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {},
          },
        ],
      },
    ],
  },
};

const development = {
  ...shared,
  mode: "development",
  devServer: {
    port: 8000,
    contentBase: PUBLIC_DIR,
    historyApiFallback: true,
    disableHostCheck: true,
  },
  devtool: "inline-source-map",
};

const production = {
  ...shared,
  mode: "production",
};

const config =
  process.env.NODE_ENV === "development" ? development : production;

module.exports = config;

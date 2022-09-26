const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? undefined : "source-map",
  entry: {
    application: path.resolve(__dirname, "../app/javascript/application.ts"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../app/assets/builds"),
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: { configFile: path.resolve(__dirname, "tsconfig.json") },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.js"),
              },
            },
          },
        ],
      },
    ],
  },
};

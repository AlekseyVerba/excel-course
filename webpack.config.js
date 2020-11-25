const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: {
      main: ["@babel/polyfill", "./index.js"]
    },
    devtool: isDev ? "source-map" : false,
    output: {
        filename: filename("js"),
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        port: 4200,
        hot: isDev
    },
    resolve: {
        extensions: [".js"],
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@core": path.resolve(__dirname, "src/core")
        }
    },
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            minify: {
                collapseWhitespace: isProd,
                removeComments: isProd
            }
        }),
        new MiniCssExtractPlugin({
            filename: filename("css")
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin(
          [
              { from:  path.resolve(__dirname, "src/excel.ico"), to: path.resolve(__dirname, "dist") },
          ]
      ),
    ],
    module: {
        rules: [
            {
              test: /\.s[ac]ss$/i,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    hmr: isDev,
                    reloadAll: true
                  }
                },
                "css-loader",
                "sass-loader",
              ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ["@babel/plugin-proposal-class-properties"]
                  }
                }
              }
        ],
    }
};


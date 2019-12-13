const path = require("path");
const Dotenv = require("dotenv-webpack");

const config = {
  mode: "development",

  entry: "./src/index.jsx",

  resolve: {
    extensions: [".js", ".jsx"],
  },

  output: {
    path: path.resolve(`${__dirname}/dist`),
    filename: "bundle.js",
  },

  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },

      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            minimize: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "url-loader",
        },
      },
    ], // rules
  }, // module

  devServer: {
    contentBase: [path.join(__dirname, "dist")],
    port: 8080,
    host: "0.0.0.0",
    open: false,
  },

  plugins: [new Dotenv()],
};

module.exports = config;

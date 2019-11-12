const path = require("path");

const config = {
  mode: "development",

  entry: "./src/index.jsx",

  output: {
    path: path.resolve(__dirname + "/dist"),
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
    ], // rules
  }, // module

  devServer: {
    contentBase: [path.join(__dirname, "dist")],
    port: 8080,
    host: "0.0.0.0",
    open: false,
  },
};

module.exports = config;

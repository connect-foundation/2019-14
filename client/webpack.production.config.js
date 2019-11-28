const path = require("path");

const config = {
  mode: "production",

  entry: "./src/index.jsx",

  resolve: {
    extensions: [".js", ".jsx"],
  },

  output: {
    path: path.resolve(`${__dirname}/dist`),
    filename: "bundle.js",
  },

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
};

module.exports = config;

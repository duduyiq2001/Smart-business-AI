const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development", // or 'production' for production builds
  entry: "./index.js", // Your entry point file
  target: "node", // Tell Webpack you're building for Node.js
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    // Automatically resolve certain extensions
    extensions: [".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Transpile your JavaScript if needed
        },
      },
    ],
  },
};

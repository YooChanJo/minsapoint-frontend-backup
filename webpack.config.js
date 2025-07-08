const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appDirectory = path.resolve(__dirname);
const { presets } = require(`${appDirectory}/babel.config.js`);

const compileNodeModules = [
  // Add every react-native package that needs compiling
  "@gluestack-ui",
  "@react-navigation",
  "react-native-css-interop",
].map(moduleName => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
  test: /\.[jt]sx?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, "index.web.js"), // Entry to your application
    path.resolve(appDirectory, "App.tsx"), // Change this to your main App file --> .web.ts files are prioritized
    path.resolve(appDirectory, 'src'), // all src elements are prebuild
    ...compileNodeModules,
  ],
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      presets,
      plugins: ["react-native-web"],
    },
  },
};


const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: [
    {
      loader: "@svgr/webpack",
    },
  ],
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
  use: {
    loader: "url-loader",
    options: {
      name: "[name].[ext]",
    },
  },
};

module.exports = {
  entry: {
    app: path.join(appDirectory, "index.web.js"),
  },
  output: {
    path: path.resolve(appDirectory, "dist"),
    publicPath: "/",
    filename: "rnw_blogpost.bundle.js",
  },
  resolve: {
    // mainFields: ["browser", "module", "main"], // unnecessary but forces to chose esm over cjs

    extensions: [
      ".web.tsx",
      ".web.ts",
      ".tsx",
      ".ts",
      "web.jsx",
      ".web.js",
      ".jsx",
      ".js",
      ".d.ts",
    ], // build resolved in this order
    alias: {
      "react-native$": "react-native-web",
      "@": path.resolve(appDirectory), // resolve alias during building
      "tailwind.config": path.resolve(appDirectory, "tailwind.config.js"), // resolve alias during building
    },
    modules: [path.resolve(appDirectory, "node_modules"), "node_modules"],
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(appDirectory, "index.html"),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // See: https://github.com/necolas/react-native-web/issues/349
      __DEV__: JSON.stringify(true),
    }),
  ],
};

/* Web compile manager --> Add configurations and additional babel features */

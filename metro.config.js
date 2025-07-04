const path = require("path");
const { withNativeWind } = require("nativewind/metro");
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

/* Resolving for shimmed react dom --> only for native codes */
const config = mergeConfig(getDefaultConfig(__dirname), {
  resolver: {
    extraNodeModules: {
      "react-dom": path.resolve(__dirname, "shims/react-dom.js"),
    },
  },
});

module.exports = withNativeWind(config, {
  input: "./global.css",
});

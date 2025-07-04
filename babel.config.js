module.exports = {
  presets: [
    "module:@react-native/babel-preset",
    "nativewind/babel",
  ],

  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        extensions: [".js", ".ts", ".tsx", ".jsx"],

        alias: {
          "@": "./",
          "tailwind.config": "./tailwind.config.js",
        },
      },
    ],
  ],
};
// module.exports = function (api) {
//   const isWeb = api.caller((caller) => caller && caller.name === "babel-loader");

//   return {
//     presets: isWeb
//       ? [
//           "@babel/preset-env",
//           "@babel/preset-react",
//           "nativewind/babel",
//         ]
//       : [
//           "module:metro-react-native-babel-preset",
//           "nativewind/babel",
//         ],
//     plugins: [
//       [
//         "module-resolver",
//         {
//           root: ["./"],
//           alias: {
//             "@": "./",
//             "tailwind.config": "./tailwind.config.js"
//           },
//           extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
//         }
//       ]
//     ]
//   };
// };
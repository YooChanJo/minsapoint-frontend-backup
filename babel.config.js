module.exports = {
  presets: ["module:@react-native/babel-preset", "nativewind/babel"],

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
/* Compiler configuration --> web/mobile common configuration */

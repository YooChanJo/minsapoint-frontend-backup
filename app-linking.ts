// this contains app structure to block double imports

// export type RootStackParamList = {
//   Home: undefined;
//   PlatformCheck: { myParam: string };
//   More: undefined;
// };

export const AppLinking = {
  /* Is not needed for web */
  prefixes: [
    /* your linking prefixes */
    "http://10.0.2.2:8081", // When using android emulator
    "http://192.168.0.42:8081", // When remote connecting --> Needs constant fixing
    // 'https://xyz.ngrok.io', // deploy
  ],
  // filter: (url) => !url.includes('+expo-auth-session'), // for filtering out unwanted paths
  config: {
    screens: {
      Home: "/",
      PlatformCheck: "/platform-check/:myParam",
      More: {
        screens: {
          Feed: "/more/feed",
          Messages: "/more",
        },
      },
    },
  },
};

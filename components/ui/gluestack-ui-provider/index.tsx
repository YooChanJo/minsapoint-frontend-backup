import React /* , { useEffect } */ from "react";
import { config } from "./config";
import { View, ViewProps } from "react-native";
import { OverlayProvider } from "@gluestack-ui/overlay";
import { ToastProvider } from "@gluestack-ui/toast";
import { useColorScheme } from "nativewind";

// export type ModeType = "light" | "dark" | "system";

export function GluestackUIProvider({
  // mode,
  ...props
}: {
  // mode?: ModeType;
  children?: React.ReactNode;
  style?: ViewProps["style"];
}) {
  const { colorScheme /* , setColorScheme */ } = useColorScheme();

  // useEffect(() => {
  //   console.log("Current light/dark sceme: ", colorScheme);
  //   if(!mode) console.log("Warning: No light dark mode specification");
  //   else setColorScheme(mode);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [mode]);

  return (
    <View
      style={[
        config[colorScheme!],
        { flex: 1, height: "100%", width: "100%" },
        props.style,
      ]}
    >
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}

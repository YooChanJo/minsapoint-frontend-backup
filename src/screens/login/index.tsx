import LinkWrapper from "@/src/components/link-wrapper";
import { StackActions } from "@react-navigation/native";
import { Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login Screen</Text>
      <View style={{ borderWidth: 1, padding: 20, margin: 10 }}>
        <LinkWrapper screen="Home" action={StackActions.popTo("Home")}>
          <Text style={{ color: "blue" }}>Go to Home</Text>
        </LinkWrapper>
      </View>
    </View>
  );
}

import { useState } from "react";
// import "./android";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Button, StyleSheet, Text, View } from "react-native";

/* Dark mode needs further studying */
function App() {
  const [displayText, setDisplayText] = useState("");
  const [flag, setFlag] = useState(false);

  return (
    <GluestackUIProvider>
      <View style={styles.container}>
        <Button
          title="any button"
          onPress={() => {
            flag ? setDisplayText("바보") : setDisplayText("최먼지는?");
            setFlag(curr => !curr);
          }}
        >
          <Text>Click me</Text>
        </Button>
        <Text style={styles.text}>{displayText}</Text>
      </View>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    justifyContent: "center",
    alignContent: "center",
    fontSize: 40,
  },
});

export default App;

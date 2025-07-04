import { GluestackUIProvider } from "@/src/components/ui/gluestack-ui-provider";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from "./src/components/screens/splash";

// import PlatformAPI from "./src/api/platform";

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <GluestackUIProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

export default App;

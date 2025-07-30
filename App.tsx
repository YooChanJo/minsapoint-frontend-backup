import React from "react";
import { GluestackUIProvider } from "@/src/components/ui/gluestack-ui-provider";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "react-native";

import PlatformAPI from "./src/api/platform";
import NavigationAPI from "./src/api/navigation";
import { AppLinking } from "./app-linking";
import LinkWrapper from "./src/components/link-wrapper";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <LinkWrapper screen="PlatformCheck" params={{ myParam: "Hello World" }}>
        <Text>Go to Details</Text>
      </LinkWrapper>
      <LinkWrapper screen="More">
        <Text>More Tabs</Text>
      </LinkWrapper>
    </View>
  );
}

function PlatformCheckScreen({ route }: { route: any }) {
  const { myParam } = route.params;

  NavigationAPI.useCompatibleEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then(response => response.json())
      .then(json => console.log(json));
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Your platform is: {PlatformAPI.getCurrentPlatform()}</Text>
      <Text>My param is: {myParam}</Text>
      <LinkWrapper screen="Home" action={StackActions.popTo("Home")}>
        <Text>Go Back</Text>
      </LinkWrapper>
    </View>
  );
}

const Tab = createNativeStackNavigator();
function MoreTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={() => (
          <View>
            <Text>Feed</Text>
          </View>
        )}
      />
      <Tab.Screen
        name="Messages"
        component={() => (
          <View>
            <Text>Messages</Text>
          </View>
        )}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="PlatformCheck"
        component={PlatformCheckScreen}
        initialParams={{ myParam: "My Param" }}
      />
      <Stack.Screen
        name="More"
        component={MoreTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider>
        <NavigationContainer
          linking={AppLinking}
          fallback={<Text>Loading...</Text>}
        >
          <RootStack />
        </NavigationContainer>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

export default App;

/* Debug App screen */
// function App() {
//   NavigationAPI.useCompatibleEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/todos/1')
//       .then(response => response.json())
//       .then(json => console.log(json))
//   }, []);
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Hello world</Text>
//     </View>
//   );
// }

/* Stack Navigator only registers screens --> these are stacked */
/* 
  To add a screen unless it is same as current screen: navigation.navigate(SCREEN_NAME, {PARAMS})
  To add a screen regardless of current screen: navigation.push(SCREEN_NAME)
  go back: navigation.goBack()
  pop to: navigation.popTo(SCREEN_NAME)
  pop to top: navigation.popToTop()
  
  // Example
  <Stack.Navigator>
    {isLoggedIn ? (
      // Screens for logged in users
      <Stack.Group>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Group>
    ) : (
      // Auth screens
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Group>
    )}
      // Common modal screens
    <Stack.Group screenOptions={{ presentation: 'modal' }}>
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Invite" component={Invite} />
    </Stack.Group>
  </Stack.Navigator>
*/
/* Navigation Ref for using navigation feature where useNavigation is not available */

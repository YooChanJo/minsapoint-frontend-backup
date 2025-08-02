import React from "react";
import { GluestackUIProvider } from "@/src/components/ui/gluestack-ui-provider";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "react-native";

/* Configurations */
import { AppLinking } from "./src/config/deep-linking";

/* Apis */
import PlatformAPI from "./src/api/platform";
import NavigationAPI from "./src/api/navigation";

/* Components */
import LinkWrapper from "./src/components/link-wrapper";

/* Screens */
import NotFound from "./src/screens/not-found";
import { AuthProvider, useAuth } from "./src/components/auth-provider";

function HomeScreen() {
  const authValue = useAuth();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome to Home Screen</Text>
      <View style={{borderWidth: 1, padding: 20, margin: 10}}>
        <Text>User Logged In: {String(authValue.userLoggedIn)}</Text>
        <Text>AccessToken: {authValue.accessToken}</Text>
      </View>
      <View style={{borderWidth: 1, padding: 20, margin: 10}}>
        <LinkWrapper screen="PlatformCheck" params={{ myParam: "Hello World" }}>
          <Text style={{color: "blue"}}>Go to PlatformCheck</Text>
        </LinkWrapper>
        <LinkWrapper screen="More">
          <Text style={{color: "blue"}}>More Tabs</Text>
        </LinkWrapper>
      </View>
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
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Feed</Text>
            <LinkWrapper screen="Messages" action={StackActions.popTo("Messages")}>
              <Text>Go to Messages</Text>
            </LinkWrapper>
            <LinkWrapper screen="Home" action={StackActions.popTo("Home")}>
              <Text>Go Back</Text>
            </LinkWrapper>
          </View>
        )}
      />
      <Tab.Screen
        name="Messages"
        component={() => (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Messages</Text>
            <LinkWrapper screen="Feed" action={StackActions.popTo("Feed")}>
              <Text>Go to Feed</Text>
            </LinkWrapper>
            <LinkWrapper screen="Home" action={StackActions.popTo("Home")}>
              <Text>Go Back</Text>
            </LinkWrapper>
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
      <Stack.Screen name="NotFound" component={NotFound} />
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
            <AuthProvider>
              <RootStack />
            </AuthProvider>
          </NavigationContainer>
        </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

export default App;

/* 
  TODO for deployment
  Add new SHA-1 signing for google auth of firebase ---> deploy
*/

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

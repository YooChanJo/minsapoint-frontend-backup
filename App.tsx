import { GluestackUIProvider } from "@/src/components/ui/gluestack-ui-provider";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, View } from "react-native";

import React from "react";
import PlatformAPI from "./src/api/platform";
import NavigationAPI from "./src/api/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";

function HomeScreen() {
  
  const navigation = NavigationAPI.useNavigationWithParamInfo();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('PlatformCheck', { myParam: "Hello World" })} title="Go to Details" />
      <Button onPress={() => navigation.navigate('More')} title="More Tabs" />
    </View>
  );
}

function PlatformCheckScreen({ route }: { route: any }) {
  const navigation = NavigationAPI.useNavigationWithParamInfo();
  const { myParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Your platform is: {PlatformAPI.getCurrentPlatform()}</Text>
      <Text>My param is: {myParam}</Text>
      <Button onPress={() => navigation.goBack()} title="Go back" />
    </View>
  )
}

const Tab = createNativeStackNavigator();
function MoreTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={() => <View><Text>Feed</Text></View>} />
      <Tab.Screen name="Messages" component={() => <View><Text>Messages</Text></View>} />
    </Tab.Navigator>
  );
}


const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PlatformCheck" component={PlatformCheckScreen} initialParams={{ myParam: "My Param" }} />
      <Stack.Screen name="More" component={MoreTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export type RootStackParamList = {
  Home: undefined;
  PlatformCheck: { myParam: string };
  More: undefined;
};

const linking = {
  prefixes: [ /* Is not needed for web */
    /* your linking prefixes */
    'http://10.0.2.2:8081', // When using android emulator
    'http://192.168.0.42:8081', // When remote connecting --> Needs constant fixing
    // 'https://xyz.ngrok.io', // deploy
  ],
  // filter: (url) => !url.includes('+expo-auth-session'), // for filtering out unwanted paths
  config: {
    screens: {
      Home: "/",
      PlatformCheck: "/:myParam",
      More: "/more"
    }
  },
};

function App() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider>
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
          <RootStack />
        </NavigationContainer>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

export default App;

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
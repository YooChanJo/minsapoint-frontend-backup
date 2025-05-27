import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native'; // to detect the platform

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY_5PQ8BppsTf_I2vqMoDRyq3CMZKUE7U",
  authDomain: "minsapoint.firebaseapp.com",
  projectId: "minsapoint",
  storageBucket: "minsapoint.firebasestorage.app",
  messagingSenderId: "456076951299",
  appId: "1:456076951299:web:5c1fd042ef230daa4c3336",
  measurementId: "G-XXSDMFK9RT"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence based on platform
let auth;

if (Platform.OS === 'web') {
  // For web, just use the default persistence (localStorage)
  auth = getAuth(app);
} else {
  // For React Native, use AsyncStorage for persistence
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { app, auth };
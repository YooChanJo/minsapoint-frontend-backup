/* Firebase functionalities should be split between web and mobile */
import { getApp } from '@react-native-firebase/app';

/* firebase.json configured for multithreading(?) in android environments */

const firebaseApp = getApp();



export { firebaseApp }
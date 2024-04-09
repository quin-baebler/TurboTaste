import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCj0pCmmgWuGq_nTjE1Q4BRYA1qdFDqbYo",
  authDomain: "turbotaste-f49e1.firebaseapp.com",
  databaseURL: "https://turbotaste-f49e1-default-rtdb.firebaseio.com",
  projectId: "turbotaste-f49e1",
  storageBucket: "turbotaste-f49e1.appspot.com",
  messagingSenderId: "813566716805",
  appId: "1:813566716805:web:acca9e9ccd9b34f7a9f2ec",
  measurementId: "G-48DHPYQ1J4"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
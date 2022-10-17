// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKp6hmXh4Rvj2rYWib2zFQhRNbTXw8NgM",
  authDomain: "reactjs-simple-auth.firebaseapp.com",
  projectId: "reactjs-simple-auth",
  storageBucket: "reactjs-simple-auth.appspot.com",
  messagingSenderId: "322233068739",
  appId: "1:322233068739:web:17367dd977716d64080676"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export app
export default app;
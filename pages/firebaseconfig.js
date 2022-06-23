// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firebase-storage";
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZRICakIjjrryDnaPvh6RgaPk_NXBIi3k",
  authDomain: "next-login2.firebaseapp.com",
  projectId: "next-login2",
  storageBucket: "next-login2.appspot.com",
  messagingSenderId: "26040032544",
  appId: "1:26040032544:web:dd03527b3d3e1a64c60b45"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
// firebase.initializeApp(firebaseConfig);
// Initialize Firebase
export default firebase
export const auth = firebase.auth()
export var storage = firebase.storage();
export const db = firebase.firestore();

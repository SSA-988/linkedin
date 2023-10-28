import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAXFQd3BVKPU2UC0Bd1jjJsJw7BCqfjxWY",
  authDomain: "linkedin-4df18.firebaseapp.com",
  projectId: "linkedin-4df18",
  storageBucket: "linkedin-4df18.appspot.com",
  messagingSenderId: "450562983259",
  appId: "1:450562983259:web:34391f413740c9f54ac67e"
};

// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase};
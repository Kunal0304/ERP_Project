import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDEiFG4t1z8WVpduhQy5e61rP9zaTroOSA",
    authDomain: "erp-management-f3b82.firebaseapp.com",
    projectId: "erp-management-f3b82",
    storageBucket: "erp-management-f3b82.appspot.com",
    messagingSenderId: "959037399504",
    appId: "1:959037399504:web:63f0482fc54394c97359d5"
}

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth
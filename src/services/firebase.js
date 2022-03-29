// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZd-FRhYsLLx91hdMDJ8JEFsJwk7a5_Yg",
    authDomain: "chatty-4130e.firebaseapp.com",
    projectId: "chatty-4130e",
    storageBucket: "chatty-4130e.appspot.com",
    messagingSenderId: "545736993676",
    appId: "1:545736993676:web:6de5754fbf08eea244c4a9",
    measurementId: "G-VM1DQEQE5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
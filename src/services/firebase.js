import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

if (!firebase.apps.length)
    firebase.initializeApp({
        apiKey: "AIzaSyDo_QpM6DwR5xdVr7UqDeWAbiggdBmE10Q",
        authDomain: "pbnj-8902.firebaseapp.com",
        databaseURL: "https://pbnj-8902.firebaseio.com",
        projectId: "pbnj-8902",
        storageBucket: "pbnj-8902.appspot.com",
        messagingSenderId: "34387303069",
        appId: "1:34387303069:web:70bf47e53ffdb853c81274",
        measurementId: "G-PSDE95GK5X"
    });

export const auth = firebase.auth;
export const db = firebase.database();
export const store = firebase.storage();

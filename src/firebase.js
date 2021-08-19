import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDdz3HSpSRWrVm82aa0fCcP-MAX3WSkGdE",
    authDomain: "todo-app-7d6f5.firebaseapp.com",
    projectId: "todo-app-7d6f5",
    storageBucket: "todo-app-7d6f5.appspot.com",
    messagingSenderId: "815855146231",
    appId: "1:815855146231:web:7a2a4479e39d36357f2ff2",
    measurementId: "G-3YRXP15Q8G"
})

const db = firebaseApp.firestore();

export default db;
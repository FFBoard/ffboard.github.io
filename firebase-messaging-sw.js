importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyBQdp6g0i5aappRe5ZlTuaO6S1XsVu-yrg",
    authDomain: "easy-innovation.firebaseapp.com",
    projectId: "easy-innovation",
    storageBucket: "easy-innovation.appspot.com",
    messagingSenderId: "324041459575",
    appId: "1:324041459575:web:b56265ef5853ee662d8372",
    measurementId: "G-6CBNFVCFBK"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

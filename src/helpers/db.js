import firebase from 'firebase/compat';

var firebaseConfig = {
    apiKey: "AIzaSyCevvv7f0Y4MB1CPmPS9YObfO345q9Cpt4",
    authDomain: "reactlogin-24c53.firebaseapp.com",
    projectId: "reactlogin-24c53",
    storageBucket: "reactlogin-24c53.appspot.com",
    messagingSenderId: "688572760293",
    appId: "1:688572760293:web:c3659ad0a8a7f397a8540c"
};
    
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);


export default fire;
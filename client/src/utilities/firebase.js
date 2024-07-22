// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLhpEQx9Kd38PGCIQmJYetRJ-KlX6cOAY",
  authDomain: "whatsdown-f3c1f.firebaseapp.com",
  projectId: "whatsdown-f3c1f",
  storageBucket: "whatsdown-f3c1f.appspot.com",
  messagingSenderId: "227743935078",
  appId: "1:227743935078:web:b98741ca67c681d60ddba7",
  measurementId: "G-Y8EZBT6D6C",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Get a reference to the storage service, which is used to upload files
const storage = firebase.storage();

export { storage };

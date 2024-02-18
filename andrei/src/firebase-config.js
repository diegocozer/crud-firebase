// firebase-config.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCCvByC3MVKEYkaMO5x96M-rvjxcsxsnPI",
    authDomain: "next-crud-4e89b.firebaseapp.com",
    projectId: "next-crud-4e89b",
    storageBucket: "next-crud-4e89b.appspot.com",
    messagingSenderId: "528086965906",
    appId: "1:528086965906:web:b75851b745d6fba652504b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

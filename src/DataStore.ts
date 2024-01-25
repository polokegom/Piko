import { initializeApp, getApp } from "firebase/app";

import {getDatabase, ref, get } from 'firebase/database';


const firebaseConfig = {

  apiKey: "AIzaSyBbcydHDUfHrBVAWz2ZHHMYfR-NKWsb5bU",
  authDomain: "piko-beta.firebaseapp.com",
  databaseURL: "https://piko-beta-default-rtdb.firebaseio.com",
  projectId: "piko-beta",
  storageBucket: "piko-beta.appspot.com",
  messagingSenderId: "373538191348",
  appId: "1:373538191348:web:e663b08f79d32690942ba1",
  measurementId: "G-J81ZN1Q24T"

};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dataRef = ref(database, 'Users/');
get(dataRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log(data);
    } else {
      console.log('No data available');
    }
  })
  .catch((error) => {
    console.error('Error loading data:', error);
  });
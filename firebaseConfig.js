// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAV34SFmlpEfwJcDqK0RO_SVdZIwohOHaY",
  authDomain: "pharmacy-nearx.firebaseapp.com",
  projectId: "pharmacy-nearx",
  storageBucket: "pharmacy-nearx.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "1:245222626364:android:40096d1ca397c474275f39"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

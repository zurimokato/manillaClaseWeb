
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl4EcEY8YuMSKwh6Fcs0k_DodPNGNUHhs",
  authDomain: "manillareact.firebaseapp.com",
  projectId: "manillareact",
  storageBucket: "manillareact.appspot.com",
  messagingSenderId: "960664774818",
  appId: "1:960664774818:web:4cbcbf0ae198481e984ffb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
export {db};
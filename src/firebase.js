import { initializeApp } from "../node_modules/firebase/app";
import { getFirestore, collection, onSnapshot, orderBy, query } from "../node_modules/firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBsFybYGiXxxe026a4Gl9jeuwjUFn5TZqY",
    authDomain: "alien-nation-f4441.firebaseapp.com",
    projectId: "alien-nation-f4441",
    storageBucket: "alien-nation-f4441.appspot.com",
    messagingSenderId: "1092397660798",
    appId: "1:1092397660798:web:fe438ac2bf9abc47a3762f",
  };
  
const application = initializeApp(firebaseConfig);
export const db = getFirestore(application);
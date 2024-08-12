// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCt0DbLXwI7trkAH4bTna9ZvaK0FmjhmZw",
  authDomain: "my-project-2efd8.firebaseapp.com",
  projectId: "my-project-2efd8",
  storageBucket: "my-project-2efd8.appspot.com",
  messagingSenderId: "486608547275",
  appId: "1:486608547275:web:c3e60bbe721dbacef69a4e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
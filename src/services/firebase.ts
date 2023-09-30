import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);



async function signIn(email: string, password: string) {
  const auth = getAuth(app)

  const userCredencial = await signInWithEmailAndPassword(auth, email, password).catch(err => {
    console.error(err.code)
    console.error(err.message)
  })

  const user = userCredencial?.user

  return user
}


class Auth {

}

class Database {

}

export { signIn }



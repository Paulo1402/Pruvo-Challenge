import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

class Auth {
  private static async updateUserName(user: User, userName: string) {
    await updateProfile(user, { displayName: userName });
  }

  static async signUp(
    name: string,
    email: string,
    password: string
  ): Promise<boolean> {
    const auth = getAuth(app);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((err) => {
      console.error(err.code);
      console.error(err.message);
    });

    if (!userCredential) return false;

    await this.updateUserName(userCredential.user, name);

    return true;
  }

  static async signOut(): Promise<boolean> {
    const auth = getAuth(app);

    try {
      await signOut(auth);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static async login(email: string, password: string): Promise<boolean> {
    const auth = getAuth(app);

    const userCredencial = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((err) => {
      console.error(err.code);
      console.error(err.message);
    });

    return !!userCredencial;
  }

  static async isAuthenticated(): Promise<boolean> {
    const auth = getAuth(app);
    const user = auth.currentUser;

    return !!user;
  }
}

class Database {}

export { Auth, Database };

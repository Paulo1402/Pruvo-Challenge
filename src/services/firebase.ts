/* eslint-disable no-async-promise-executor */
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

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
    const user = await this.getCurrentUser();
    return !!user;
  }

  static async getCurrentUser(): Promise<User | null> {
    const auth = getAuth(app);

    const user = await new Promise<User | null>((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve(user);
      });
    });

    return user;
  }
}

export interface ITest {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

class Database {
  static async getTests(): Promise<ITest[]> {
    const db = getFirestore(app);
    const user = await Auth.getCurrentUser();

    return new Promise(async (resolve, reject) => {
      if (user) {
        const userId = user.uid;
        const testsCollection = collection(db, `users/${userId}/tests`);
        const testsQuery = query(testsCollection);

        const querySnapshot = await getDocs(testsQuery);

        const tests: ITest[] = [];

        querySnapshot.forEach((doc) => {
          const test = Object.assign({ id: doc.id }, doc.data()) as ITest;
          tests.push(test);
        });

        resolve(tests);
      } else {
        reject(new Error("User is not authenticated."));
      }
    });
  }

  static async addTest(name: string, content: string): Promise<string> {
    const db = getFirestore(app);
    const user = await Auth.getCurrentUser();

    if (user) {
      const userId = user.uid;
      const testsCollection = collection(db, `users/${userId}/tests`);

      const test = await addDoc(testsCollection, {
        name,
        content,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return test.id
    } else {
      throw new Error("User is not authenticated.");
    }
  }
}

export { Auth, Database };

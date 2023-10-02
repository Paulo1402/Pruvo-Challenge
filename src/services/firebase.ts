/* eslint-disable no-async-promise-executor */
import { Test } from "@/models/test";
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
  setDoc,
  serverTimestamp,
  doc,
  deleteDoc,
  onSnapshot,
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
  ): Promise<void> {
    const auth = getAuth(app);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await this.updateUserName(userCredential.user, name);
  }

  static async signOut(): Promise<void> {
    const auth = getAuth(app);
    await signOut(auth);
  }

  static async login(email: string, password: string): Promise<void> {
    const auth = getAuth(app);
    await signInWithEmailAndPassword(auth, email, password);
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

class Database {
  static async getTests(): Promise<Test[]> {
    const db = getFirestore(app);
    const user = await Auth.getCurrentUser();

    return new Promise(async (resolve, reject) => {
      if (user) {
        const userId = user.uid;
        const testsCollection = collection(db, `users/${userId}/tests`);
        const testsQuery = query(testsCollection);
        const querySnapshot = await getDocs(testsQuery);

        const tests: Test[] = [];

        querySnapshot.forEach((doc) => {
          const test = new Test(doc.id, doc.data());
          tests.push(test);
        });

        resolve(tests);
      } else {
        reject(new Error("User is not authenticated."));
      }
    });
  }

  static async addTest(name: string, content: string): Promise<void> {
    const db = getFirestore(app);
    const user = await Auth.getCurrentUser();

    if (user) {
      const userId = user.uid;
      const testsCollection = collection(db, `users/${userId}/tests`);

      await addDoc(testsCollection, {
        name,
        content,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      throw new Error("User is not authenticated.");
    }
  }

  static async updateTest(
    id: string,
    name: string,
    content: string
  ): Promise<void> {
    const db = getFirestore(app);
    const user = await Auth.getCurrentUser();

    if (user) {
      const userId = user.uid;
      const testRef = doc(db, `users/${userId}/tests/${id}`);

      await setDoc(
        testRef,
        {
          name,
          content,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } else {
      throw new Error("User is not authenticated.");
    }
  }

  static async deleteTest(id: string): Promise<void> {
    const db = getFirestore(app);
    const user = await Auth.getCurrentUser();

    if (user) {
      const userId = user.uid;
      const testRef = doc(db, `users/${userId}/tests/${id}`);

      await deleteDoc(testRef);
    } else {
      throw new Error("User is not authenticated.");
    }
  }

  static async listenToTestsDoc(callback: (tests: Test[]) => void) {
    const db = getFirestore(app);
    const user = await Auth.getCurrentUser();

    if (user) {
      const userId = user.uid;
      const testsCollection = collection(db, `users/${userId}/tests`);

      const unsubscribeTests = onSnapshot(testsCollection, (querySnapshot) => {
        const tests: Test[] = [];

        querySnapshot.forEach((doc) => {
          const test = new Test(doc.id, doc.data());
          tests.push(test);
        });

        callback(tests);
      });

      return unsubscribeTests;
    } else {
      throw new Error("User is not authenticated.");
    }
  }
}

export { Auth, Database };

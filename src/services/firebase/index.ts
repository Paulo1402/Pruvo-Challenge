/* eslint-disable no-async-promise-executor */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  onAuthStateChanged,
  Unsubscribe,
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

import { app } from "./firebaseConfig";
import { Test } from "@/models/test";

interface AuthStore {
  isAuthenticated: boolean;
  loggin: (userName: string) => void;
  signOut: () => void;
}

interface TestsStore {
  update: (tests: Test[]) => void;
}

class Auth {
  private static authStore: AuthStore;

  static setup(authStore: AuthStore): void {
    this.authStore = authStore;
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
    await this.authenticate();
  }

  private static async updateUserName(user: User, userName: string) {
    await updateProfile(user, { displayName: userName });
  }

  static async login(email: string, password: string): Promise<void> {
    const auth = getAuth(app);
    await signInWithEmailAndPassword(auth, email, password);

    await this.authenticate();
  }

  static async signOut(): Promise<void> {
    const auth = getAuth(app);
    await signOut(auth);

    Database.unsubscribeTestsListener();
    this.authStore.signOut();
  }

  static async authenticate() {
    const user = await this.getCurrentUser();

    if (user) {
      this.authStore.loggin(user.displayName || "Usuário");
      Database.listenToTests();
    }
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

  static async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }
}
class Database {
  private static testsStore: TestsStore;
  private static unsubscribeTests: Unsubscribe | null;

  static setup(testsStore: TestsStore): void {
    this.testsStore = testsStore;
  }

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

      return test.id;
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

  static async listenToTests() {
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

        this.testsStore.update(tests);
      });

      this.unsubscribeTests = unsubscribeTests;
    } else {
      throw new Error("User is not authenticated.");
    }
  }

  static async unsubscribeTestsListener() {
    if (this.unsubscribeTests) {
      this.unsubscribeTests();
      this.unsubscribeTests = null;
    }
  }
}

export { Auth, Database };

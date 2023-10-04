import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const authenticatedUserName = ref("");

  function loggin(username: string): void {
    isAuthenticated.value = true;
    authenticatedUserName.value = username;
  }

  function signOut(): void {
    isAuthenticated.value = false;
    authenticatedUserName.value = "";
  }

  return { isAuthenticated, authenticatedUserName, loggin, signOut };
});

<template>
  <v-container class="text-center">
    <div class="d-flex flex-row justify-center align-center mb-8">
      <h1 class="mr-4">Pruvo Challenge</h1>
      <img src="/pruvo-logo.png" height="50" />
    </div>

    <div v-if="store.isAuthenticated">
      <h2>{{ messageGreeting }}</h2>

      <p>
        Use o menu lateral para navegar ou vá direto para uma das opções abaixo!
      </p>

      <v-container>
        <v-btn
          color="primary"
          size="large"
          class="mr-4 mt-4"
          prepend-icon="mdi-list-box"
          to="/tests"
          >Ver provas</v-btn
        >
        <v-btn
          color="secondary"
          size="large"
          class="mr-4 mt-4"
          prepend-icon="mdi-new-box"
          to="/new"
          >Nova prova</v-btn
        >
      </v-container>
    </div>

    <div v-else>
      <h2 class="mb-4">Faça login pra acessar a aplicação!</h2>
      <v-btn color="success" to="/login">Entrar</v-btn>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/useAuth";

const store = useAuthStore();

const currentHour = new Date().getHours();
let messageGreeting = "";

if (currentHour > 18) {
  messageGreeting = "Boa noite";
} else if (currentHour > 12) {
  messageGreeting = "Boa tarde";
} else {
  messageGreeting = "Bom dia";
}

messageGreeting = `${messageGreeting} ${store.authenticatedUserName}! Seja bem vindo!`;
</script>

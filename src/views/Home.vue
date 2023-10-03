<template>
  <v-container class="text-center">
    <div v-if="store.isAuthenticated">
      <h1 class="mb-8">Pruvo Challenge</h1>
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
      Faça login pra acessar a aplicação!
      <v-btn color="success">Logar</v-btn>
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

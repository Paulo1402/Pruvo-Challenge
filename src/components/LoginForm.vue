<template>
  <v-container>
    <v-card class="mx-auto mt-4 px-6 py-8" max-width="400">
      <v-card-title class="pb-4">LOGIN</v-card-title>

      <v-alert
        v-model="showError"
        closable
        type="error"
        text="Algo deu errado durante o login!"
      >
      </v-alert>

      <v-form v-model="form" @submit.prevent="handleSubmit">
        <v-text-field
          class="mb-2"
          v-model="email"
          label="E-mail"
          clearable
          type="email"
          :rules="[validateEmail]"
        ></v-text-field>

        <v-text-field
          class="mb-2"
          v-model="password"
          label="Senha"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          :rules="[validatePassword]"
        ></v-text-field>

        <v-btn
          class="mt-4"
          block
          variant="elevated"
          size="large"
          color="success"
          type="submit"
          :disabled="!form || loading"
          :loading="loading"
          >Entrar</v-btn
        >
      </v-form>

      <v-card-text class="text-center"
        ><v-btn variant="plain" :ripple="false" @click="$emit('toggle')"
          >Cadastrar agora!</v-btn
        ></v-card-text
      >
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { Auth } from "@/services/firebase";
import { validateEmail, validatePassword } from "@/libs/validation";

const emit = defineEmits(["logged", "toggle"]);

const email = ref("");
const password = ref("");

const showError = ref(false);
const showPassword = ref(false);
const loading = ref(false);
const form = ref(false);

async function handleSubmit() {
  loading.value = true;
  showError.value = false;

  try {
    await Auth.login(email.value, password.value);
    emit("logged");
  } catch (e) {
    console.error(e);
    showError.value = true;
  }

  loading.value = false;
}
</script>

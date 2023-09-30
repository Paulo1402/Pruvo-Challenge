<template>
  <v-container>
    <v-card class="mx-auto mt-4 px-6 py-8" max-width="400">
      <v-card-title class="pb-4">CADASTRAR</v-card-title>

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

        <v-text-field
          class="mb-2"
          label="Confirme sua senha"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          :rules="[validatePasswordMatch]"
        ></v-text-field>

        <v-btn
          class="mt-4"
          block
          variant="elevated"
          size="large"
          color="success"
          type="submit"
          :disabled="!form"
          >Criar conta</v-btn
        >
      </v-form>

      <v-card-text class="text-center"
        ><v-btn variant="plain" :ripple="false" @click="$emit('login')"
          >Já tem uma conta? Faça login!</v-btn
        ></v-card-text
      >
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";
import { signIn } from "@/services/firebase";

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const form = ref(false);

async function handleSubmit() {
  const user = await signIn(email.value, password.value);

  if (user) {
    await router.push("/");
    return;
  }

  alert("Usuário inválido");
}

function validatePassword(password: string) {
  return password.length >= 6 || "Mínimo 6 caracteres.";
}

function validatePasswordMatch(passwordConfirm: string) {
  return passwordConfirm == password.value || "As senhas não coincidem.";
}

function validateEmail(email: string) {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(email) || "E-mail inválido.";
}
</script>

<template>
  <SignUpForm v-show="showSignUp" @toggle="toggleForm" @logged="handleLogged" />
  <LoginForm v-show="!showSignUp" @toggle="toggleForm" @logged="handleLogged" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import SignUpForm from "@/components/SignUpForm.vue";
import LoginForm from "@/components/LoginForm.vue";

import { Database } from "@/services/firebase";
import { useTestsStore } from "@/stores/useTests";

const router = useRouter();
const route = useRoute();

const store = useTestsStore();

const showSignUp = ref(false);

function toggleForm() {
  showSignUp.value = !showSignUp.value;
}

async function handleLogged() {
  await Database.listenToTestsDoc(store.update);

  if (route.query.redirect) {
    await router.push({ path: route.query.redirect as string });
  } else {
    await router.push("/");
  }
}
</script>

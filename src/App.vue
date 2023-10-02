<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useTestsStore } from "@/stores/useTests";
import { Auth, Database } from "./services/firebase";

const store = useTestsStore();

onMounted(async () => {
  const isAuthenticated = await Auth.isAuthenticated()

  if (isAuthenticated) {
    const tests = await Database.getTests();
    store.update(tests);
  }
});
</script>

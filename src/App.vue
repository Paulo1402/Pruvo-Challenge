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
    // const tests = await Database.getTests();
    // store.update(tests);

    // Ao adicionar o listener automaticamente ele já responde e chama a função de callback,
    // ou seja não é necessário retornar os dados manualmente usando Database.getTests()
    Database.listenToTestsDoc(store.update)
  }
});
</script>

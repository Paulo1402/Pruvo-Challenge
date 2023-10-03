<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onBeforeMount} from "vue";
import { useTestsStore } from "@/stores/useTests";
import { Auth, Database } from "./services/firebase";

const store = useTestsStore();

onBeforeMount(async () => {
  const isAuthenticated = await Auth.isAuthenticated()
  console.log('isAuthenticated: ' + isAuthenticated )

  if (isAuthenticated) {
    // Ao adicionar o listener automaticamente ele já responde e chama a função de callback,
    // ou seja não é necessário retornar os dados manualmente usando Database.getTests()
    await Database.listenToTestsDoc(store.update)
  }
});
</script>

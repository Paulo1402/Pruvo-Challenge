<template>
  <router-view />
</template>

<script lang="ts" setup>
import { Auth, Database } from "@/services/firebase";
import { useTestsStore } from "@/stores/useTests";
import { useAuthStore } from "@/stores/useAuth";

const authStore = useAuthStore();
const testsStore = useTestsStore();

Auth.setup(authStore);
Database.setup(testsStore);
</script>

<template>
  <SignUp v-show="showSignUp" @toggle="toggleForm"/>
  <Login v-show="!showSignUp" @toggle="toggleForm"/>

</template>

<script setup lang="ts">
  import { ref } from "vue";

  import SignUp from "@/components/SignUp.vue";
  import Login from "@/components/Login.vue";

  const showSignUp = ref(false)

  function toggleForm() {
    showSignUp.value = !showSignUp.value
  }
</script>

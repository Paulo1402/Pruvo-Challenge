<template>
  <v-app>
    <AppBar />
    <default-view />
    <AppFooter />
  </v-app>
</template>

<script lang="ts" setup>
  import AppBar from './AppBar.vue'
  import AppFooter from './AppFooter.vue';
  import DefaultView from './View.vue'
</script>

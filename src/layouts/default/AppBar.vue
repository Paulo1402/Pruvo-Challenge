<template>
  <v-navigation-drawer v-model="isDrawerOpen">
    <v-list>
      <v-list-subheader> Menu </v-list-subheader>
      <v-list-item prepend-icon="mdi-home">Home</v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar flat>
    <v-app-bar-nav-icon
      @click="isDrawerOpen = !isDrawerOpen"
    ></v-app-bar-nav-icon>
    <v-app-bar-title>
      <v-btn :ripple="false" variant="plain" to="/">Pruvo Challenge </v-btn>
    </v-app-bar-title>
    <v-btn prepend-icon="mdi-circle-slice-4" @click="toggleTheme">
      Mudar tema
    </v-btn>
    <v-btn color="primary" variant="tonal" to="login">Login</v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useTheme } from "vuetify";

const isDrawerOpen = ref(false);
const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

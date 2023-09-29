<template>
  <v-app-bar flat>
    <v-app-bar-title class="">Pruvo Challenge</v-app-bar-title>
    <v-btn class="flex-grow-0" prepend-icon="mdi-circle-slice-4" @click="toggleTheme">
      Mudar tema
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useTheme } from "vuetify";

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

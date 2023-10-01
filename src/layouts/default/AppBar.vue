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

    <v-btn color="red" variant="tonal">
      Sair
      <v-dialog v-model="isDialogOpen" activator="parent" width="auto">
        <v-card title="ATENÇÃO">
          <v-card-text>Deseja sair dessa sessão?</v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn :disabled="loading" :loading="loading" color="red" @click="signOut">Sim</v-btn>
            <v-btn color="primary" @click="isDialogOpen = false">Não</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useTheme } from "vuetify";

import { Auth } from "@/services/firebase";
import router from "@/router";

const loading = ref(false)
const isDialogOpen = ref(false);
const isDrawerOpen = ref(false);

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}

async function signOut() {
  loading.value = true

  await Auth.signOut();

  loading.value = false
  isDialogOpen.value = false

  router.push('/login')
}
</script>

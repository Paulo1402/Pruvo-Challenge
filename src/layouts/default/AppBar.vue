<template>
  <v-navigation-drawer v-if="isAuthenticated" v-model="isDrawerOpen">
    <v-list>
      <v-list-subheader>Menu</v-list-subheader>
      <v-list-item prepend-icon="mdi-home">Home</v-list-item>
      <v-list-item prepend-icon="mdi-home">Provas</v-list-item>
      <v-list-item prepend-icon="mdi-home">Nova Prova</v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar>
    <v-app-bar-nav-icon v-if="isAuthenticated"
      @click="isDrawerOpen = !isDrawerOpen"
    ></v-app-bar-nav-icon>

    <v-app-bar-title>
      <v-btn :ripple="false" variant="plain" to="/">Pruvo Challenge</v-btn>
    </v-app-bar-title>

    <v-btn class="mr-2" prepend-icon="mdi-circle-slice-4" @click="toggleTheme">
      Mudar tema
    </v-btn>

    <v-btn v-if="isAuthenticated" color="red" variant="tonal">
      Sair
      <v-dialog v-model="isDialogOpen" activator="parent" width="auto">
        <v-card title="ATENÇÃO">
          <v-card-text>Deseja sair dessa sessão?</v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn :disabled="isSignOutLoading" :loading="isSignOutLoading" color="red" @click="signOut">Sim</v-btn>
            <v-btn color="primary" @click="isDialogOpen = false">Não</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref} from "vue";
import { useTheme } from "vuetify";

import { Auth } from "@/services/firebase";
import router from "@/router";

const isSignOutLoading = ref(false)
const isDialogOpen = ref(false);
const isDrawerOpen = ref(false);
const isAuthenticated = ref(true);

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}

async function signOut() {
  isSignOutLoading.value = true

  await Auth.signOut();

  isSignOutLoading.value = false
  isDialogOpen.value = false

  router.push('/login')
}
</script>

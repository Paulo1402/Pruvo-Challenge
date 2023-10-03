<template>
  <v-navigation-drawer
    v-if="store.isAuthenticated"
    v-model="drawer"
    disable-route-watcher
  >
    <v-list>
      <v-list-subheader>Menu</v-list-subheader>

      <v-list-item exact nav prepend-icon="mdi-home" to="/">Home</v-list-item>
      <v-list-item exact nav prepend-icon="mdi-list-box" to="/tests"
        >Ver Provas</v-list-item
      >
      <v-list-item exact nav prepend-icon="mdi-new-box" to="/new"
        >Nova Prova</v-list-item
      >
    </v-list>
  </v-navigation-drawer>

  <v-app-bar>
    <v-app-bar-nav-icon
      v-if="store.isAuthenticated"
      @click="drawer = !drawer"
    ></v-app-bar-nav-icon>

    <v-app-bar-title>
      <v-btn :ripple="false" variant="plain" to="/">Pruvo Challenge</v-btn>
    </v-app-bar-title>

    <v-btn class="mr-2" prepend-icon="mdi-circle-slice-4" @click="toggleTheme">
      <template #default>
        <div class="d-none d-sm-flex">Mudar Tema</div>
      </template>
    </v-btn>

    <v-btn
      v-if="store.isAuthenticated"
      color="red"
      variant="tonal"
      class="relative"
    >
      Sair
      <v-dialog v-model="dialog" activator="parent" width="auto">
        <v-card title="ATENÇÃO">
          <v-card-text>Deseja sair dessa sessão?</v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              :disabled="loading"
              :loading="loading"
              color="red"
              @click="signOut"
              >Sim</v-btn
            >
            <v-btn color="primary" @click="dialog = false">Não</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useTheme } from "vuetify";
import { useRouter } from "vue-router";

import { Auth } from "@/services/firebase";
import { useAuthStore } from "@/stores/useAuth";

const loading = ref(false);
const dialog = ref(false);
const drawer = ref(false);

const router = useRouter();
const theme = useTheme();
const store = useAuthStore();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}

async function signOut() {
  loading.value = true;

  try {
    await Auth.signOut();
    router.push("/login");
  } catch (e) {
    console.error(e);
  }

  loading.value = false;
  dialog.value = false;
}
</script>

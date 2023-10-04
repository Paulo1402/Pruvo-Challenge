<template>
  <v-container class="text-center">
    <h1 class="mb-4">Nova Prova</h1>

    <v-card class="mx-auto px-6 py-8" max-width="1200">
      <v-alert
        v-model="showError"
        closable
        type="error"
        text="Algo deu errado durante a criação!"
      >
      </v-alert>

      <v-form v-model="form">
        <v-text-field
          v-model="testName"
          label="Nome da prova"
          class="text-start mb-4"
          :rules="[validateName]"
        ></v-text-field>

        <Editor v-model="editorData" />

        <v-card-actions class="mt-4">
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            :disabled="!form || !!!editorData || loading"
            variant="tonal"
            color="blue"
            @click="handleSubmit"
            >Salvar</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { Database } from "@/services/firebase";
import { validateName } from "@/libs/validation";
import Editor from "@/components/Editor.vue";

const router = useRouter();

const testName = ref("");
const editorData = ref("");

const showError = ref(false);
const loading = ref(false);
const form = ref(false);

async function handleSubmit() {
  loading.value = true;
  showError.value = false;

  try {
    const id = await Database.addTest(testName.value, editorData.value);
    router.push(`test/${id}`);
  } catch {
    showError.value = true;
    console.log("Erro");
  }

  loading.value = false;
}
</script>

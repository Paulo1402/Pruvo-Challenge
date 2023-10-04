<template>
  <v-container class="text-center">
    <h1 class="mb-4">Atualizar Prova</h1>

    <v-card class="mx-auto px-6 py-8" max-width="1200">
      <v-alert
        v-model="showError"
        closable
        type="error"
        text="Algo deu errado durante a interação!"
      >
      </v-alert>

      <v-form v-model="form">
        <v-text-field
          v-model="test.name"
          label="Nome da prova"
          class="text-start mb-4"
          :rules="[validateName]"
        ></v-text-field>

        <Editor v-model="test.content" />

        <v-card-actions class="mt-4">
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            :disabled="!form || !!!test.content || loading"
            variant="tonal"
            class="mr-4"
            color="blue"
            @click="handleSubmit"
            >Salvar</v-btn
          >

          <DeleteButton
            @click="showError = false"
            @error="showError = true"
            :test-id="testId"
          />
          <v-spacer></v-spacer>
        </v-card-actions>

        <v-card-text class="pb-0">
          <p>Criado em {{ test.createdAt }}</p>
          <p>Atualizado em {{ test.updatedAt }}</p>
        </v-card-text>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

import { validateName } from "@/libs/validation";
import { Database } from "@/services/firebase";
import { useTestsStore } from "@/stores/useTests";
import { Test } from "@/models/test";

import Editor from "@/components/Editor.vue";
import DeleteButton from "@/components/DeleteButton.vue";

const route = useRoute();
const testId = route.params.id as string;

const store = useTestsStore();
const test = ref<Test>(store.getTest(testId) as Test);

store.$subscribe(() => {
  test.value = store.getTest(testId) as Test;
});

const showError = ref(false);
const loading = ref(false);
const form = ref(false);

async function handleSubmit() {
  loading.value = true;
  showError.value = false;

  try {
    await Database.updateTest(testId, test.value.name, test.value.content);
  } catch (error) {
    showError.value = true;
    console.error(error);
  }

  loading.value = false;
}
</script>

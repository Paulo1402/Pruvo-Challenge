<template>
  <v-container class="text-center">
    <h1 class="mb-4">Nova Prova</h1>

    <v-card class="mx-auto px-6 py-8" max-width="800">
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

        <Editor
          v-model="editorData"
          :api-key="apiKey"
          @init="handleEditorInit"
        />

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
import Editor from "@tinymce/tinymce-vue";
import { Database } from "@/services/firebase";

type EditorMap = {
  editorCommands: {
    commands: {
      exec: {
        mceinsertcontent(_: any, __: any, content: string): void;
      };
    };
  };
};

const showError = ref(false);
const loading = ref(false);
const form = ref(false);
const testName = ref("");
const editorData = ref("");
const editorRef = ref<EditorMap>();

const router = useRouter();
const apiKey = import.meta.env.VITE_TINY_API_KEY;

function validateName(name: string) {
  return !!name || "Insira um nome.";
}

function handleEditorInit(_: any, editor: EditorMap) {
  editorRef.value = editor;
}

async function handleSubmit() {
  loading.value = true;
  showError.value = false;

  try {
    await Database.addTest(testName.value, editorData.value);
  } catch {
    showError.value = true;
    console.log("Erro");
  }

  loading.value = false;
}

function insertText(text: string) {
  editorRef.value?.editorCommands.commands.exec.mceinsertcontent(
    "",
    false,
    text
  );
}
</script>

<style scoped>
.editor-container {
  max-width: 800px;
  width: 100%;
}
</style>

<template>
  <v-container class="text-center d-flex justify-center">
    <v-form v-model="form" class="editor-container">
      <div class="editor-container">
        <h1 class="mb-8">Atualizar Prova</h1>

        <v-text-field
          v-model="testName"
          label="Nome da prova"
          class="text-start mb-4"
          :rules="[validateName]"
        ></v-text-field>

        <Editor
          class="editor-container"
          v-model="editorData"
          :api-key="apiKey"
          @init="handleEditorInit"
        />

        <v-btn
          :loading="loading"
          :disabled="!form || !!!editorData || loading"
          class="mt-4 mr-4"
          size="large"
          color="blue"
          @click="handleSubmit"
          >Salvar</v-btn
        >

        <v-btn
          :loading="loading"
          :disabled="loading"
          class="mt-4"
          size="large"
          color="red"
          @click="handleSubmit"
          >Deletar</v-btn
        >

        <p>Criado em {{ test?.createdAt }}</p>
        <p>Atualizado em {{ test?.updatedAt }}</p>
      </div>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import Editor from "@tinymce/tinymce-vue";
import { Database } from "@/services/firebase";
import { useTestsStore } from "@/stores/useTests";

type EditorMap = {
  editorCommands: {
    commands: {
      exec: {
        mceinsertcontent(_: any, __: any, content: string): void;
      };
    };
  };
};

const route = useRoute();
const testId = route.params.id as string;

const store = useTestsStore();
const test = store.getTest(testId);

const loading = ref(false);
const form = ref(false);
const testName = ref(test?.name);
const editorData = ref(test?.content);
const editorRef = ref<EditorMap>();

const apiKey = import.meta.env.VITE_TINY_API_KEY;

function validateName(name: string) {
  return !!name || "Insira um nome.";
}

function handleEditorInit(_: any, editor: EditorMap) {
  editorRef.value = editor;
}

async function handleSubmit() {
  try {
    loading.value = true;
    await Database.updateTest(
      testId,
      testName.value as string,
      editorData.value as string
    );
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error(error);
  }
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

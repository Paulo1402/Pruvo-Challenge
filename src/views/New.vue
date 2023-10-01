<template>
  <v-container class="text-center d-flex justify-center">
    <v-form v-model="form" class="editor-container">
      <div class="editor-container">
        <h1 class="mb-8">Nova prova</h1>

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
          :loading="!loading"
          :disabled="!form || !!!editorData || loading"
          class="mt-4"
          size="large"
          color="blue"
          @click="handleSubmit"
          >Salvar</v-btn
        >
      </div>
    </v-form>
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
  try {
    loading.value = true;
    const testId = await Database.addTest(testName.value, editorData.value);
    loading.value = false;

    router.push({ name: "test", params: { id: testId } });
  } catch {
    console.log("Erro");
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

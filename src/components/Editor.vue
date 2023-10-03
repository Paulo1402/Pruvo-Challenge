<template>
  <v-row>
    <v-col>
      <Editor
        v-model="localContent"
        :api-key="apiKey"
        @init="handleEditorInit"
      />
    </v-col>

    <v-col md="3" cols="12">
      <v-container class="pa-0">
        <v-btn class="mb-4" color="blue" @click="insertText('Discursiva')" block
          >Discursiva</v-btn
        >
        <v-btn
          class="mb-4"
          color="orange"
          @click="insertText('Múltipla Escolha')"
          block
          >Múltipla Escolha</v-btn
        >
        <v-btn class="mb-4" color="green" @click="insertText('Matriz')" block
          >Matriz</v-btn
        >
      </v-container>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Editor from "@tinymce/tinymce-vue";

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(["update:modelValue"]);

const apiKey = import.meta.env.VITE_TINY_API_KEY;

const localContent = ref(props.modelValue);
const editorRef = ref<EditorMap>();

// Esse watch alerta a prop vinda do v-model do componente pai sobre qualquer alteração na ref localContent
watch(localContent, (newValue) => {
  emit("update:modelValue", newValue);
});

type EditorMap = {
  editorCommands: {
    commands: {
      exec: {
        mceinsertcontent(_: any, __: any, content: string): void;
      };
    };
  };
};

function handleEditorInit(_: any, editor: EditorMap) {
  editorRef.value = editor;
}

function insertText(text: string) {
  editorRef.value?.editorCommands.commands.exec.mceinsertcontent(
    "",
    false,
    text
  );
}
</script>

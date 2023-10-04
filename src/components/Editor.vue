<template>
  <v-row>
    <v-col>
      <Editor
        v-model="localContent"
        :api-key="apiKey"
        :init="{
          plugins:
            'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
        }"
        @init="handleEditorInit"
      />
    </v-col>

    <v-col md="3" cols="12">
      <v-container class="pa-0 mb-8">
        <v-btn
          v-for="(question, i) in questionsTemplate"
          :key="i"
          variant="tonal"
          class="mb-4"
          color="primary"
          @click="insertText(question.template)"
          block
          >{{ question.name }}
        </v-btn>
      </v-container>

      <v-tooltip location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn variant="elevated" icon v-bind="props">
            <v-icon color="primary"> mdi-help </v-icon>
          </v-btn>
        </template>
        <span>Posicione o cursor no editor e clique em um dos modelos de questões! :)</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Editor from "@tinymce/tinymce-vue";

import { questionsTemplate } from "@/libs/editor";

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

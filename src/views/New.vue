<template>
  <v-container>
    <Editor v-model="editorData" :api-key="apiKey" />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Editor from "@tinymce/tinymce-vue";

const editorData = ref('')
const apiKey = import.meta.env.VITE_TINY_API_KEY;

</script>

<template>
  <v-card max-width="600" class="mx-auto">
    <v-alert
      v-model="showError"
      closable
      type="error"
      text="Algo deu errado durante a interação!"
    >
    </v-alert>

    <div :class="['bg-color', 'bg-' + color]"></div>

    <v-card-title>{{ name }}</v-card-title>
    <v-card-text>Atualizado em: {{ updatedAt }}</v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn variant="tonal" :to="'test/' + id">Editar</v-btn>
      <DeleteButton @click="showError = false" @error="showError = true" :test-id="id" />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import DeleteButton from "@/components/DeleteButton.vue";
import { ref } from "vue";

defineProps<{ id: string; name: string; updatedAt: string; color: string }>();

const showError = ref(false);
</script>

<style>
.bg-color {
  width: 100%;
  height: 50px;
}
</style>

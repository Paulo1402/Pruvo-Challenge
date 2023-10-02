<template>
  <v-card width="400" class="mx-auto">
    <div :class="['bg-color', 'bg-' + color]"></div>

    <v-card-title>{{  name  }}</v-card-title>
    <v-card-text>Atualizado em: {{  updatedAt  }}</v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn variant="tonal" :to="'test/' + id">Editar</v-btn>
      <DeleteButton :test-id="id" />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  import DeleteButton from '@/components/DeleteButton.vue'

  defineProps<{id: string, name: string, updatedAt: string, color: string}>()
</script>

<style>
  .bg-color {
    width: 100%;
    height: 50px;
  }
</style>
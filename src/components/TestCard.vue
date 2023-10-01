<template>
  <v-card width="400" class="mx-auto">
    <div style="width: 100%; height: 50px" class="bg-orange"></div>

    <v-card-title>{{  name  }}</v-card-title>

    <v-card-text>
      {{  content  }}
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn variant="tonal">Ver</v-btn>
      <v-btn variant="tonal">Editar</v-btn>
      <v-btn variant="tonal" color="red" @click="handleDelete">Deletar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  const props = defineProps<{id: string, name: string, content: string}>()

  function handleDelete() {
    console.log('id: ' + props.id)
  }
</script>

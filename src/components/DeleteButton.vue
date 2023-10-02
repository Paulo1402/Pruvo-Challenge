<template>
  <v-btn variant="tonal" color="red">
    <v-dialog v-model="isDialogOpen" activator="parent" width="auto">
        <v-card title="ATENÇÃO">
          <v-card-text>Deseja deletar essa prova?</v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="red" @click="handleDelete">Sim</v-btn>
            <v-btn color="primary" @click="isDialogOpen = false">Não</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  Deletar</v-btn>
</template>

<script setup lang="ts">
import { Database } from '@/services/firebase';
import { ref } from 'vue';

  const props = defineProps<{testId: string}>()
  const isDialogOpen = ref(false)

  async function handleDelete() {
    try {
      await Database.deleteTest(props.testId)
    } catch (error) {
      console.error(error)
    }

    isDialogOpen.value = false

  }
</script>

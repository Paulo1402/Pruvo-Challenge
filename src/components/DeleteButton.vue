<template>
  <v-btn variant="tonal" color="red">
    <v-dialog v-model="dialog" activator="parent" width="auto">
      <v-card title="ATENÇÃO">
        <v-card-text>Deseja deletar essa prova?</v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="red" @click="handleDelete">Sim</v-btn>
          <v-btn color="primary" @click="dialog = false">Não</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    Deletar</v-btn
  >
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router'

import { Database } from "@/services/firebase";

const props = defineProps<{ testId: string }>();
const emit = defineEmits(["error"]);

const dialog = ref(false);

const router = useRouter()

async function handleDelete() {
  try {
    await Database.deleteTest(props.testId);
    await router.push('/tests')
  } catch (error) {
    emit("error");
    console.error(error);
  }

  dialog.value = false;
}
</script>

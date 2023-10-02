<template>
  <v-container class="text-center">
    <div v-if="tests.length > 0">
      <h1 class="mb-8">Provas</h1>

      <TestCard
        v-for="(test, i) in tests"
        class="mb-8"
        :key="i"
        :id="test.id"
        :name="test.name"
        :content="test.content"
        :color="getColor(i)"
      />
    </div>
    <div v-else>
      <h1 class="mb-4">
        Parece que você não tem nenhuma prova ainda... Crie uma agora!
      </h1>
      <v-btn color="success" to="/new">Criar prova</v-btn>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import TestCard from "@/components/TestCard.vue";
import { useTestsStore } from "@/stores/useTests";

const store = useTestsStore();
const { tests } = storeToRefs(store);

function getColor(index: number): string {
  const colors = [
    'orange',
    'blue',
    'red',
    'green',
    'yellow'
  ]

  return colors[index % colors.length]
  }
</script>

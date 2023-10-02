<template>
  <v-container class="text-center">
    <div v-if="store.tests.length > 0">
      <h1 class="mb-8">Provas</h1>

      <TestCard
        v-for="(card, i) in store.tests"
        class="mb-8"
        :key="i"
        :id="card.id"
        :name="card.name"
        :content="card.content"
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
import TestCard from "@/components/TestCard.vue";
import { useTestsStore } from "@/stores/useTests";

const store = useTestsStore();
</script>

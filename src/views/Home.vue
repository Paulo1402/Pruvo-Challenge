<template>
  <v-container class="text-center">
    <TestCard
      class="mb-8"
      v-for="(card, i) in cards"
      :key="i"
      :id="card.id"
      :name="card.name"
      :content="card.content"
    />
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Database, ITest } from "@/services/firebase";
import TestCard from "@/components/TestCard.vue";

const cards = ref<ITest[]>([]);

onMounted(async () => {
  cards.value = await Database.getTests();
});
</script>

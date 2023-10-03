<template>
  <v-footer app class="flex-sm-row d-flex flex-column py-4 m-auto justify-center">
    <div class="text-center">Feito com ❤️ by Paulo Benatto - {{ new Date().getFullYear() }}</div>

    <div class="ml-6">
      <v-btn
        v-for="buttonLink in buttonsLink"
        size="small"
        target="_blank"
        variant="flat"
        :key="buttonLink.icon"
        :icon="buttonLink.icon"
        :href="buttonLink.link"
      >
      </v-btn>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
const buttonsLink = [
  {
    icon: "mdi-linkedin",
    link: "https://linkedin.com/in/paulobenatto/",
  },
  {
    icon: "mdi-github",
    link: "https://github.com/Paulo1402",
  },
  {
    icon: "mdi-instagram",
    link: "https://instagram.com/paulobenatto_02",
  },
];
</script>

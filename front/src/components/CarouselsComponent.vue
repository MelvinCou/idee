<script setup lang="ts">
const props = defineProps<{
  mainLayout?: boolean;
  images?: string[];
}>();
</script>

<template>
  <v-carousel :class="props.mainLayout && 'main-layout-class'">
    <template v-if="props.images && props.images.length >= 1">
      <v-carousel-item v-for="image in props.images" :key="image" :src="image" cover />
    </template>
    <v-carousel-item
      v-else
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png" />
  </v-carousel>
</template>

<style scoped>
.main-layout-class {
  height: 20% !important;
}
</style>

<script setup lang="ts">
const props = defineProps<{
  mainLayout?: boolean;
  images?: string[];
}>();
</script>

<template>
  <v-carousel v-if="images && images?.length >= 1" :class="props.mainLayout && 'main-layout-class'">
    <v-carousel-item v-for="image in props.images" :key="image" :src="image" cover />
  </v-carousel>
  <img
    v-else
    class="no-image"
    cover
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png" />
</template>

<style scoped>
.main-layout-class {
  height: 20% !important;
}

.no-image {
  height: 20% !important;
  width: -webkit-fill-available;
}
</style>

<script setup lang="ts"></script>

<template>
  <v-navigation-drawer color="pink">
    <v-data-iterator :items="[1, 2, 3, 4, 5]">
      <template v-slot:default="{ items }">
        <template v-for="(item, i) in items" :key="i">
          <v-card
            subtitle="This is an event i"
            text="This is content"
            title="This is a title"></v-card>
          <br />
        </template>
      </template>
    </v-data-iterator>
  </v-navigation-drawer>
  <v-main>
    <!-- Content -->
    <v-layout full-height>
      <v-row>
        <v-col>
          <v-sheet :height="200" :width="200" color="red-lighten-3"></v-sheet>
        </v-col>
      </v-row>
    </v-layout>
  </v-main>
</template>

<style scoped>
.app-bar {
  color: black;
}
.nav-icon {
  background-color: rebeccapurple;
}
.bar-title {
  background-color: aliceblue;
}
</style>

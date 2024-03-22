<template>
  <v-app id="inspire">
    <v-navigation-drawer class="bg-blue" v-model="drawer">
      <!-- Content -->
    </v-navigation-drawer>

    <v-app-bar class="bg-black">
      <v-app-bar-nav-icon class="bg-red" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Fox explorer</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <!-- Content -->
      <v-row>
        <v-col cols="12" sm="12"  md="3"  >
          <v-data-iterator :items="[1, 2, 3, 4, 5]" class="bg-pink ">
              <template v-slot:default="{ items }">
                <v-row>
                  <v-col v-for="item in items" :key="item.raw.name" >
                    <v-card
                      subtitle="This is an event"
                      text="This is content"
                      title="This is a title"
                      width="300"
                    ></v-card>
                  </v-col>
                </v-row>
              </template>
          </v-data-iterator>
        </v-col>
        <v-col class="bg-yellow" >
          <v-sheet :height="200" :width="200" color="red-lighten-3"></v-sheet>
        </v-col>
      </v-row>

    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false) // Changed from null to false to match the expected type for v-model
</script>

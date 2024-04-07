<script setup lang="ts">
import { ref } from "vue";

const user = ref({
  initials: "JD",
  fullName: "John Doe",
  email: "john.doe@doe.com",
});
</script>

<template>
  <v-app id="inspire">
    <v-app-bar color="black">
      <v-app-bar-title>Fox explorer</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="brown" size="large">
              <span class="text-h5">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <span class="text-h5">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn variant="text" rounded> Edit Account </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn variant="text" rounded> Disconnect </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-main>
      <!-- Content -->
      <v-layout full-height>
        <v-row>
          <v-navigation-drawer color="pink">
            <v-data-iterator :items="[1, 2, 3, 4, 5]">
              <template v-slot:default="{ items }">
                <template v-for="(item, i) in items" :key="i">
                  <div class="m-1.5">
                    <v-card
                      subtitle="This is an event i"
                      text="This is content"
                      title="This is a title"></v-card>
                  </div>
                  <br />
                </template>
              </template>
            </v-data-iterator>
          </v-navigation-drawer>
          <v-col>
            <v-sheet :height="200" :width="200" color="red-lighten-3"></v-sheet>
          </v-col>
        </v-row>
      </v-layout>
    </v-main>
  </v-app>
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

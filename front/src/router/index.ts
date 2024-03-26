import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import InteractiveMap from "../views/InteractiveMap.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LandingPage,
    },
    {
      path: "/map",
      name: "map",
      component: InteractiveMap,
    }
  ]
});

export default router;

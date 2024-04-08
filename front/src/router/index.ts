import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/views/LandingPage.vue";
import InteractiveMap from "@/views/InteractiveMap.vue"
import MapView from "@/views/MapView.vue";
import SearchDestination from "@/components/SearchDestination.vue";

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
    },
    {
      path: "/map2",
      name: "map2",
      component: MapView,
    },
    {
      path: '/city-details/:name', // Utilisez un paramètre dynamique pour la ville
      name: 'CityDetails',
      component: SearchDestination,
      props: true // Permet de passer les paramètres de route en tant que props au composant
    }
  ]
});

export default router;

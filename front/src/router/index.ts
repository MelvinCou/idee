import type { Router } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import MainLayout from "./../views/MainLayout.vue";

/**
 * Configuration of the routes for the application.
 */
const router: Router = createRouter({
  /**
   * Using navigation history based on browser history.
   *
   * @see https://next.router.vuejs.org/guide/essentials/history-mode.html
   */
  history: createWebHistory(import.meta.env.BASE_URL),

  /**
   * Definition of the application routes.
   */
  routes: [
    /**
     * Main route for the home page.
     */
    {
      path: "/",
      name: "home",
      component: LandingPage,
    },

    /**
     * Route for the main page with an optional 'cityId' parameter.
     *
     * @param {string} [cityId] - City identifier (optional).
     */
    {
      path: "/main/:cityId?",
      name: "MainPage",
      component: MainLayout,
    },
  ],
});

/**
 * Exporting the configured router instance.
 */
export default router;

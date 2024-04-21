import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * Store for managing user data.
 */
export const useUserStore = defineStore("user", () => {
  /**
   * Reference to the user data.
   */
  const user = ref({
    name: "",
    avatar: "",
    connected: false,
  });

  /**
   * Reference to the interval ID for the cron job.
   */
  const intervalId = ref<number>(0);

  /**
   * Fetch user data from the server.
   */
  const getUser = async () => {
    let data;
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/github_connected`, {
        credentials: "include",
      });
      data = await response.json();
      user.value.name = data.name?.length > 0 ? data.name : data.login;
      user.value.avatar = data.avatar_url;
      if (response.ok) user.value.connected = true;
    } catch (error) {
      // Handle error
    }
  };

  /**
   * Start the cron job to fetch user data periodically.
   */
  const startCron = () => {
    intervalId.value = window.setInterval(
      () => {
        getUser();
      },
      5 * 60 * 1000, // Get user data every 5 min
    );
  };

  // Start the cron job when the store is initialized
  startCron();

  return { user, getUser };
});

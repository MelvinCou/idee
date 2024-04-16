import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref({
    name: "",
    avatar: "",
    connected: false,
  });
  const intervalId = ref(0);

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
      //
    }
  };
  const startCron = () => {
    intervalId.value = window.setInterval(
      () => {
        getUser();
      },
      5 * 60 * 1000, // Get user data every 5 min
    );
  };
  startCron();

  return { user, getUser };
});

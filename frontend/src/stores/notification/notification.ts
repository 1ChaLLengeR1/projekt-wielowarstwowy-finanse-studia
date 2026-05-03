import { defineStore } from "pinia";
import { ref } from "vue";

export type Notification = {
  type: string;
  description: string;
};

export const NotificationStore = defineStore("notificationStore", () => {
  const isActive = ref<boolean>(false);

  const data_to_notification = ref<Notification>({
    type: "",
    description: "",
  });

  return { isActive, data_to_notification };
});

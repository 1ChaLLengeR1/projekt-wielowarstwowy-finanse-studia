import { defineStore } from "pinia";
import { ref } from "vue";

export const ConfirmBoxStore = defineStore("confirmBoxStore", () => {
  const isActice = ref<boolean>(false);
  const info = ref<string>("Czy na pewno chcesz to zrobić?");

  const callback = ref<() => Promise<void>>(() => Promise.resolve());

  const confirmBox = async () => {
    isActice.value = true;
    await callback.value();
    callback.value = () => Promise.resolve();
    isActice.value = false;
  };

  const closeBox = () => {
    isActice.value = false;
  };

  const setCallback = (newCallback: () => Promise<void>) => {
    callback.value = newCallback;
  };

  return { isActice, info, confirmBox, closeBox, setCallback };
});

import { defineStore } from "pinia";
import { ref } from "vue";

export const EditBoxStore = defineStore("editBoxStore", () => {
  const isActice = ref<boolean>(false);

  const callback = ref<() => Promise<void>>(() => Promise.resolve());

  const submitHandler = async () => {
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

  return { isActice, submitHandler, closeBox, setCallback };
});

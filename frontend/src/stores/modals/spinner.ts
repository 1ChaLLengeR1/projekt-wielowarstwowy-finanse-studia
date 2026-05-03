import { defineStore } from "pinia";
import { ref } from "vue";

export const LoadingSpinnerStore = defineStore("loadingSpinnerStore", () => {
  const isLoading = ref<boolean>(false);
  const progressBarPdfFilterCollection = ref<string[]>([]);

  const addProgressBarPdfFilter = (message: string) => {
    progressBarPdfFilterCollection.value.push(message);
  };

  const progresBarPdfFilter = ref<string>("");

  return {
    isLoading,
    progresBarPdfFilter,
    progressBarPdfFilterCollection,
    addProgressBarPdfFilter,
  };
});

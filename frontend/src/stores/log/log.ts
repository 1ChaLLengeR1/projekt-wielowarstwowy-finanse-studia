import { defineStore } from "pinia";
import { ref } from "vue";

// api
import { createLog } from "@/api/logs/post";
import { collectionLogs } from "@/api/logs/fetch";

// types
import type { Log, ApiCollectionLogs } from "@/types/api/logs/types";

export const LogStore = defineStore("logStore", () => {
  const collection = ref<Log[]>([]);

  const apiFetchCollection = async (num: number) => {
    const response = await collectionLogs(num);
    if (response && response.isValid) {
      const responseData = response.data as ApiCollectionLogs;
      collection.value = responseData;
    }
  };

  const apiCreateLog = async (description: string) => {
    const response = await createLog(description);
    if (response && response.isValid) {
      return;
    }
  };

  return { collection, apiFetchCollection, apiCreateLog };
});

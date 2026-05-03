import { defineStore } from "pinia";
import { ref } from "vue";

//api
import {
  apiCollectionTasks,
  apiCollectionStatisticsTask,
} from "@/api/tasks/get";
import { apiCreateTask } from "@/api/tasks/post";
import { apiDeleteTask } from "@/api/tasks/delete";
import { apiUpdateActiveTask, apiUpdateTask } from "@/api/tasks/patch";

// types
import type { Error } from "@/types/global";
import type { CollectionTasks, StatisticsTask } from "@/types/api/tasks/types";
import type {
  CreateTaskBody,
  UpdateActiveTaskBody,
  UpdateTaskBody,
} from "@/types/tasks/type";

// stores
import { NotificationStore } from "@/stores/notification/notification";

export const ApiTaskStore = defineStore("apiTaskStore", () => {
  const notificationStore = NotificationStore();
  const collectionTasks = ref<CollectionTasks>([]);
  const collectionStatisticsTask = ref<StatisticsTask | null>(null);

  const apiGetTasks = async (
    restart: boolean = false,
    active: boolean = true,
  ) => {
    if (restart) {
      collectionTasks.value = [];
    }

    if (collectionTasks.value.length > 0) {
      return;
    }
    const response = await apiCollectionTasks(active);
    if (response && response.isValid) {
      const responseData = response.data as CollectionTasks;
      collectionTasks.value = responseData;
    } else {
      const responseError = response.data as Error;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError.message,
      };
    }
  };
  const apiGetStatisticsTaskF = async (
    startDate: string,
    endDate: string,
  ): Promise<boolean> => {
    const response = await apiCollectionStatisticsTask(startDate, endDate);
    if (response && response.isValid) {
      const responseData = response.data as StatisticsTask;
      collectionStatisticsTask.value = responseData;
      return true;
    } else {
      const responseError = response.data as Error;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError.message,
      };
    }
    return false;
  };

  const apiCreateTaskF = async (body: CreateTaskBody): Promise<boolean> => {
    const response = await apiCreateTask(body);
    if (response && response.isValid) {
      await apiGetTasks(true, true);
      notificationStore.data_to_notification = {
        type: "success",
        description: "Dodano poprawnie zadanie.",
      };
      return true;
    } else {
      const responseError = response.data as Error;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError.message,
      };
    }
    return true;
  };
  const apiDeleteTaskF = async (task_id: string) => {
    const response = await apiDeleteTask(task_id);
    if (response && response.isValid) {
      await apiGetTasks(true, true);
    } else {
      const responseError = response.data as Error;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError.message,
      };
    }
  };
  const apiUpdateTaskF = async (task_id: string, body: UpdateTaskBody) => {
    const response = await apiUpdateTask(task_id, body);
    if (response && response.isValid) {
      await apiGetTasks(true, true);
    } else {
      const responseError = response.data as Error;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError.message,
      };
    }
  };
  const apiUpdateActiveTaskF = async (
    task_id: string,
    body: UpdateActiveTaskBody,
    typeList: boolean = true,
  ) => {
    const response = await apiUpdateActiveTask(task_id, body);
    if (response && response.isValid) {
      await apiGetTasks(true, typeList);
    } else {
      const responseError = response.data as Error;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError.message,
      };
    }
  };

  return {
    collectionTasks,
    collectionStatisticsTask,
    apiGetTasks,
    apiGetStatisticsTaskF,
    apiCreateTaskF,
    apiDeleteTaskF,
    apiUpdateTaskF,
    apiUpdateActiveTaskF,
  };
});

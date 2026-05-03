import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// apis
import { apiCollectionCalendaryCondition } from "@/api/calendar/condition/fetch";
import { apiCreateCalendaryCondition } from "@/api/calendar/condition/post";
import { apiUpdateCalendaryConditionById } from "@/api/calendar/condition/patch";
import { apiDeleteCalendaryConditionById } from "@/api/calendar/condition/delete";

// types
import type { ApiCollectionCalendaryCondition } from "@/types/api/calendar/condition/types";
import type { PayloadBodyCreateCondition } from "@/types/calendary/types";

export const ApiCalendaryCinditionStore = defineStore(
  "apiCalendaryCinditionStore",
  () => {
    const collection = ref<ApiCollectionCalendaryCondition>([]);
    const notificationStore = NotificationStore();

    const fetchCalendaryCollectionCondition = async () => {
      const response = await apiCollectionCalendaryCondition();
      if (response && response.isValid) {
        const responseData = response.data as ApiCollectionCalendaryCondition;
        collection.value = responseData;
      } else {
        const responseError = response.data as string;
        notificationStore.data_to_notification = {
          type: "error",
          description: responseError,
        };
      }
    };

    const postCalendaryCreateCondition = async (
      payload: PayloadBodyCreateCondition,
    ) => {
      const response = await apiCreateCalendaryCondition(payload);
      if (response && response.isValid) {
        collection.value = [];
        setTimeout(async () => {
          await fetchCalendaryCollectionCondition();
        }, 500);
        notificationStore.data_to_notification = {
          type: "success",
          description: "Dodatno poprawnie stan.",
        };
      } else {
        const responseError = response.data as string;
        notificationStore.data_to_notification = {
          type: "error",
          description: responseError,
        };
      }
    };

    const patchCalendaryUpdateByIdCondition = async (
      conditionId: string,
      payload: PayloadBodyCreateCondition,
    ) => {
      const response = await apiUpdateCalendaryConditionById(
        conditionId,
        payload,
      );
      if (response && response.isValid) {
        collection.value = [];
        setTimeout(async () => {
          await fetchCalendaryCollectionCondition();
          notificationStore.data_to_notification = {
            type: "success",
            description: "Poprawnie zaktualizowano stan.",
          };
        }, 500);
      } else {
        const responseError = response.data as string;
        notificationStore.data_to_notification = {
          type: "error",
          description: responseError,
        };
      }
    };

    const deleteCalendaryDeleteByIdCondition = async (conditionId: string) => {
      const response = await apiDeleteCalendaryConditionById(conditionId);
      if (response && response.isValid) {
        collection.value = [];
        setTimeout(async () => {
          await fetchCalendaryCollectionCondition();
          notificationStore.data_to_notification = {
            type: "success",
            description: "Dodatno usunięto stan.",
          };
        }, 500);
      } else {
        const responseError = response.data as string;
        notificationStore.data_to_notification = {
          type: "error",
          description: responseError,
        };
      }
    };

    return {
      collection,
      fetchCalendaryCollectionCondition,
      deleteCalendaryDeleteByIdCondition,
      postCalendaryCreateCondition,
      patchCalendaryUpdateByIdCondition,
    };
  },
);

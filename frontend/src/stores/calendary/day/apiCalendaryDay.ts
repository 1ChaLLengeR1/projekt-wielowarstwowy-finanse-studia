import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// apis
import {
  apiUpdateCalendaryDayById,
  apiUpdateCalendaryDaysMany,
  apiUpdateCalendaryDaysManySalary,
} from "@/api/calendar/days/patch";

// types
import type {
  PayloadBodyUpdateByIdCalendaryDay,
  PayloadBodyUpdateDaysMany,
  PayloadBodyUpdateDaysManySalary,
} from "@/types/calendary/types";

export const ApiCalendaryDayStore = defineStore("apiCalendaryDayStore", () => {
  const notificationStore = NotificationStore();

  const updateCalendaryDayById = async (
    dayId: string,
    payload: PayloadBodyUpdateByIdCalendaryDay,
  ) => {
    const response = await apiUpdateCalendaryDayById(dayId, payload);
    if (response && response.isValid) {
      notificationStore.data_to_notification = {
        type: "success",
        description: "Zaktualizowano dzień poprawnie",
      };
    } else {
      const responseError = response.data as string;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError,
      };
    }
  };

  const updateCalendaryDaysMany = async (
    payload: PayloadBodyUpdateDaysMany,
  ) => {
    const response = await apiUpdateCalendaryDaysMany(payload);
    if (response && response.isValid) {
      notificationStore.data_to_notification = {
        type: "success",
        description: "Zaktualizowano dni poprawnie",
      };
    } else {
      const responseError = response.data as string;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError,
      };
    }
  };

  const updateCalendaryDaysManySalary = async (
    payload: PayloadBodyUpdateDaysManySalary,
  ) => {
    const response = await apiUpdateCalendaryDaysManySalary(payload);
    if (response && response.isValid) {
      notificationStore.data_to_notification = {
        type: "success",
        description: "Zaktualizowano dni poprawnie z wypłatą.",
      };
    } else {
      const responseError = response.data as string;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError,
      };
    }
  };

  return {
    updateCalendaryDayById,
    updateCalendaryDaysMany,
    updateCalendaryDaysManySalary,
  };
});

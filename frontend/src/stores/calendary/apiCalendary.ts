import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// apis
import {
  apiCollectionCalendary,
  apiCollectionCalendaryStatistics,
} from "@/api/calendar/fetch";
import { apiCreateCalendary } from "@/api/calendar/post";

import type {
  ApiCollectionCalendary,
  ApiCalendaryStatistics,
} from "@/types/api/calendar/types";
import type { PayloadBodyCreateCalendary } from "@/types/calendary/types";

export const ApiCalendaryStore = defineStore("apiCalendaryStore", () => {
  const collection = ref<ApiCollectionCalendary>({
    year: null,
    month: null,
    month_name: null,
    days: [],
    statistics: null,
  });

  const statistics = ref<ApiCalendaryStatistics>({
    year: null,
    total_hours_worked: null,
    total_earnings: null,
    working_days_count: null,
    total_norm_hours: null,
    hours_difference: null,
    total_holidays: null,
    total_days_in_year: null,
    average_hours_per_working_day: null,
    average_daily_earnings: null,
    work_efficiency_percentage: null,
  });

  const notificationStore = NotificationStore();

  const fetchCallendaryCollection = async (year: number, month: number) => {
    const response = await apiCollectionCalendary(year, month);
    if (response && response.isValid) {
      const responseData = response.data as ApiCollectionCalendary;
      collection.value = responseData;
    } else {
      const responseError = response.data as Error;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError.message,
      };
    }
  };

  const fetchCallendaryCollectionStatistics = async (year: number) => {
    const response = await apiCollectionCalendaryStatistics(year);
    if (response && response.isValid) {
      const responseData = response.data as ApiCalendaryStatistics;
      statistics.value = responseData;
    } else {
      const responseError = response.data as Error;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError.message,
      };
    }
  };

  const postCalendaryCreated = async (payload: PayloadBodyCreateCalendary) => {
    const response = await apiCreateCalendary(payload);
    if (response && response.isValid) {
      const responseData = response.data as ApiCalendaryStatistics;
      statistics.value = responseData;
    } else {
      const responseError = response.data as Error;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError.message,
      };
    }
  };

  return {
    collection,
    statistics,
    fetchCallendaryCollection,
    fetchCallendaryCollectionStatistics,
    postCalendaryCreated,
  };
});

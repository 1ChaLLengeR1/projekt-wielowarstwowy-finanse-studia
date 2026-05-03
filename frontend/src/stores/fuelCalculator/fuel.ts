import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// api
import { fuelCalculations } from "@/api/fuel_calculations/post";

import type { fuelCalculationBody } from "@/types/fuelCalculation/types";
import type { ApiFuelCalculation } from "@/types/api/fuelCalculation/types";

export const FuelCalculationStore = defineStore("fuelCalculationStore", () => {
  const notificationStore = NotificationStore();

  const schemaPattern = ref<ApiFuelCalculation>({
    price: 0,
    pattern: "",
  });

  const apiFuelCalculation = async (body: fuelCalculationBody) => {
    const response = await fuelCalculations(body);
    if (response && response.isValid) {
      const responseData = response.data as ApiFuelCalculation;
      schemaPattern.value = responseData;
      notificationStore.data_to_notification = {
        type: "success",
        description: "Obliczono poprawnie złużycie paliwa!",
      };
    } else {
      const responseError = response.data as string;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError,
      };
    }
  };

  return { schemaPattern, apiFuelCalculation };
});

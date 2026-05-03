import { defineStore } from "pinia";
import { ref } from "vue";

// api
import { calculatorKeys } from "@/api/patryk/calculatorWork/fetch";
import { calculations } from "@/api/patryk/calculatorWork/post";
import { calculationUpdate } from "@/api/patryk/calculatorWork/put";

// types
import type {
  CalculationsUpdateBody,
  Calculations,
  CalculationsBody,
} from "@/types/patryk/calculatorWork/types";
import type {
  ApiCalculatorKeys,
  ApiCalculations,
} from "@/types/api/patryk/calculatorWork/types";

// stores
import { NotificationStore } from "@/stores/notification/notification";

export const CalculatorVatStore = defineStore("calculatorVatStore", () => {
  const notificationStore = NotificationStore();
  const calculation = ref<Calculations>({
    id: "",
    income_tax: 0,
    vat: 0,
    inpost_parcel_locker: 0,
    inpost_courier: 0,
    inpost_cash_of_delivery_courier: 0,
    dpd: 0,
    allegro_matt: 0,
    without_smart: 0,
  });

  const setCalculation = (key: keyof Calculations, num: number) => {
    if (key === "id") {
      return;
    }
    calculation.value[key] = num;
  };

  const result = ref<ApiCalculations>({
    brutto: 0,
    na_czysto: 0,
    zysk_procentowy: 0,
  });

  const apiFetch = async () => {
    if (calculation.value.id) {
      return;
    }
    const response = await calculatorKeys();
    if (response && response.isValid) {
      const responseData = response.data as ApiCalculatorKeys;
      calculation.value = responseData;
    } else {
      console.error("error for fetch ApiCalculatorKeys, check nettworks!");
    }
  };

  const apiCalculations = async (body: CalculationsBody) => {
    const response = await calculations(body);
    if (response && response.isValid) {
      const responseData = response.data as ApiCalculations;
      result.value = responseData;
    } else {
      const responseError = response.data as string;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError,
      };
    }
  };

  const apiCalculationUpdate = async (body: CalculationsUpdateBody) => {
    const response = await calculationUpdate(body);
    if (response && response.isValid) {
      notificationStore.data_to_notification = {
        type: "success",
        description: "Poprawnie zaktualizowano klucze kalkulatora!",
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
    calculation,
    result,
    apiFetch,
    apiCalculations,
    apiCalculationUpdate,
    setCalculation,
  };
});

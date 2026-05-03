import { defineStore } from "pinia";
import { ref } from "vue";

// stores
import { NotificationStore } from "@/stores/notification/notification";

// api
import { outStandingMoneyCollection } from "@/api/outstandingMoney/fetch";
import {
  outStandingMoneyAddItem,
  outStandingMoneyCreateList,
} from "@/api/outstandingMoney/post";
import {
  outStandingMoneyEditItem,
  outStandingMoneyEditNameList,
} from "@/api/outstandingMoney/put";
import {
  outStandingMoneyDeleteItem,
  outStandingMoneyDeleteList,
} from "@/api/outstandingMoney/delete";

// types
import type { ApiOutStandingMoneyCollection } from "@/types/api/outstandingMoney/types";
import type {
  CreateListBody,
  AddItemBody,
  EditNameListBody,
  EditItemBody,
} from "@/types/outstandingMoney/types";

export const MoneySettlementStore = defineStore("moneySettlementStore", () => {
  const notificationStore = NotificationStore();
  const collectionList = ref<ApiOutStandingMoneyCollection>([]);

  const apiCollectionList = async (restart: boolean = false) => {
    if (restart) {
      collectionList.value = [];
    }

    if (collectionList.value.length > 0) {
      return;
    }

    const response = await outStandingMoneyCollection();
    if (response && response.isValid) {
      const responseData = response.data as ApiOutStandingMoneyCollection;
      collectionList.value = responseData;
    } else {
      const responseError = response.data as string;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError,
      };
    }
  };

  const apiCreateList = async (body: CreateListBody): Promise<boolean> => {
    const response = await outStandingMoneyCreateList(body);
    if (response && response.isValid) {
      notificationStore.data_to_notification = {
        type: "success",
        description: "Dodano poprawnie liste!",
      };
      await apiCollectionList(true);
      return true;
    } else {
      const responseError = response.data as string;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError,
      };
      return false;
    }
  };

  const apiAddItem = async (body: AddItemBody) => {
    const response = await outStandingMoneyAddItem(body);
    if (response && response.isValid) {
      notificationStore.data_to_notification = {
        type: "success",
        description: "Poprawnie dodano Produkt!",
      };
      await apiCollectionList(true);
    } else {
      const responseError = response.data as string;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError,
      };
    }
  };

  const apiEditNameList = async (body: EditNameListBody) => {
    const response = await outStandingMoneyEditNameList(body);
    if (response && response.isValid) {
      notificationStore.data_to_notification = {
        type: "success",
        description: "Poprawna edycja Listy!",
      };
      await apiCollectionList(true);
    } else {
      const responseError = response.data as string;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError,
      };
    }
  };

  const apiEditItem = async (body: EditItemBody) => {
    const response = await outStandingMoneyEditItem(body);
    if (response && response.isValid) {
      notificationStore.data_to_notification = {
        type: "success",
        description: "Poprawna edycja Product!",
      };
      await apiCollectionList(true);
    } else {
      const responseError = response.data as string;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError,
      };
    }
  };

  const apiDeleteList = async (id: string) => {
    const response = await outStandingMoneyDeleteList(id);
    if (response && response.isValid) {
      notificationStore.data_to_notification = {
        type: "success",
        description: "Poprawna usunięto Liste!",
      };
      await apiCollectionList(true);
    } else {
      const responseError = response.data as string;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError,
      };
    }
  };

  const apiDeleteItem = async (id: string) => {
    const response = await outStandingMoneyDeleteItem(id);
    if (response && response.isValid) {
      notificationStore.data_to_notification = {
        type: "success",
        description: "Poprawnie usunięto Liste!",
      };
      await apiCollectionList(true);
    } else {
      const responseError = response.data as string;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError,
      };
    }
  };

  return {
    collectionList,
    apiCollectionList,
    apiCreateList,
    apiAddItem,
    apiEditNameList,
    apiEditItem,
    apiDeleteList,
    apiDeleteItem,
  };
});

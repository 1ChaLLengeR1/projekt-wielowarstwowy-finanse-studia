import { defineStore } from "pinia";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

// stores
import { NotificationStore } from "@/stores/notification/notification";
import { AuthStore } from "@/stores/auth/auth";

// api
import { pdfFilterDownload } from "@/api/patryk/pdfFilter/post";

// composables
import { useWebSocket } from "@/composable/websockets/pdfFilter";

export const PdfFilterStore = defineStore("pdfFilterStore", () => {
  const { t } = useI18n();
  const authStore = AuthStore();
  const notificationStore = NotificationStore();

  const apiCreatePdfFilter = async (body: FormData) => {
    const user = authStore.getUser();
    const { progressMessage, connectWebSocket, closeWebSocket } = useWebSocket(
      user?.id!,
      t,
    );

    progressMessage.value = "Łączenie z serwerem...";
    if (user?.id) {
      connectWebSocket();
    }

    const response = await pdfFilterDownload(body);
    if (response && response.isValid) {
      notificationStore.data_to_notification = {
        type: "success",
        description: "Poprawnie pobrano PDF!",
      };
    } else {
      const responseError = response.data as string;
      notificationStore.data_to_notification = {
        type: "error",
        description: responseError,
      };
    }
    closeWebSocket();
  };

  return { apiCreatePdfFilter };
});

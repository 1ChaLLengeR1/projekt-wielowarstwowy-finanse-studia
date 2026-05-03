<template>
  <div class="fixed right-0 top-0 z-50">
    <ul class="flex flex-col gap-1 p-1">
      <li
        v-for="(item, index) in array_notifications"
        :key="index"
        class="flex h-28 flex-row bg-green-300"
        :class="{ 'bg-red-300': item.type === 'error' }"
      >
        <div class="flex h-full w-20 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35px"
            height="35px"
            fill="rgb(21 128 61)"
            viewBox="0 0 512 512"
            v-if="item.type === 'success'"
          >
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35px"
            height="35px"
            fill="rgb(220 38 38)"
            viewBox="0 0 512 512"
            v-else
          >
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
            />
          </svg>
        </div>
        <div
          class="flex w-full flex-col items-start justify-center border-r border-gray-600 sm:w-80"
        >
          <h1>{{ new Date(item.id).toLocaleString() }}</h1>
          <h1 class="font-bold" v-if="item.type === 'success'">
            {{ t("notification.success") }}
          </h1>
          <h1 class="font-bold" v-else>{{ t("notification.error") }}</h1>
          <h2>{{ item.description }}</h2>
        </div>
        <div
          class="flex h-full w-12 items-center justify-center hover:bg-green-400 sm:w-20"
          :class="{ 'hover:bg-red-400': item.type === 'error' }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35px"
            height="35px"
            viewBox="0 0 384 512"
            fill="rgb(21 128 61)"
            class="cursor-pointer"
            v-if="item.type === 'success'"
            @click="removeItem(item.id)"
          >
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35px"
            height="35px"
            viewBox="0 0 384 512"
            fill="rgb(220 38 38)"
            class="cursor-pointer"
            v-else
            @click="removeItem(item.id)"
          >
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { NotificationStore } from "@/stores/notification/notification";

export default defineComponent({
  name: "Notification",
  setup() {
    const { t } = useI18n();
    const notificationStore = NotificationStore();
    const array_notifications = ref<
      { id: number; type: string; description: string }[]
    >([]);

    const removeItem = (number_id: number) => {
      const findId = array_notifications.value.findIndex(
        (obj) => obj.id === number_id,
      );
      if (findId !== -1) {
        array_notifications.value.splice(findId, 1);
      }
    };

    watchEffect(() => {
      if (
        !notificationStore.data_to_notification.type ||
        !notificationStore.data_to_notification.description
      )
        return;

      const newNotification = {
        id: Date.now(),
        type: notificationStore.data_to_notification.type,
        description: notificationStore.data_to_notification.description,
      };

      array_notifications.value.push(newNotification);

      setTimeout(() => {
        removeItem(newNotification.id);
      }, 4000);
    });

    return { array_notifications, removeItem, t };
  },
});
</script>

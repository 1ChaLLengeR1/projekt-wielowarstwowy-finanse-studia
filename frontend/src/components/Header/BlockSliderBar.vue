<template>
  <div
    class="fixed top-0 z-40 flex h-full w-52 flex-col gap-2 p-1"
    :class="{ 'right-0': site }"
  >
    <div
      class="flex w-full items-center justify-start"
      :class="{ 'justify-end': site }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40px"
        height="40px"
        viewBox="0 0 384 512"
        fill="#FCA311"
        class="cursor-pointer rounded-3xl bg-black p-1 duration-300 hover:scale-110"
        @click="closeSliderBar"
      >
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
        />
      </svg>
    </div>
    <ul class="mr-0 flex w-full flex-col gap-1">
      <li
        @click="closeSliderBar"
        v-for="(link, index) in arrayList"
        :key="index"
      >
        <router-link
          class="flex w-full items-center justify-center border border-black bg-color-bg py-3 text-lg text-color-yellow duration-300 hover:border-white hover:text-white"
          :to="{ path: `${link.path}` }"
          >{{ t(`${link.title}`) }}</router-link
        >
      </li>
      <li
        class="flex w-full items-center justify-center border border-black bg-color-bg py-3 text-lg text-color-yellow duration-300 hover:border-white hover:text-white"
      >
        <button @click="logout">Wyloguj się</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AuthStore } from "@/stores/auth/auth";
import { useI18n } from "vue-i18n";

// types
import type { Link } from "@/utils/paths";

export default defineComponent({
  name: "BlockSliderBar",
  props: {
    site: {
      required: true,
      type: Boolean,
    },
    arrayList: {
      required: true,
      type: Array<Link>,
    },
  },
  emits: ["close-silderBar"],
  setup(_, ctx) {
    const { t } = useI18n();
    const authStore = AuthStore();

    const closeSliderBar = () => {
      ctx.emit("close-silderBar", { id: "", value: false });
    };

    const logout = () => {
      authStore.logOut();
      closeSliderBar();
    };
    return { closeSliderBar, logout, t };
  },
});
</script>

<style scoped></style>

<template>
  <div
    class="flex w-full cursor-pointer items-center justify-between rounded-t-3xl bg-color-bg-dark"
    @click="open_panel_list"
  >
    <div class="w-full text-center">
      <p class="font-syne text-lg font-bold text-white sm:text-3xl">
        {{ name }}
      </p>
    </div>

    <div
      class="flex h-full w-20 items-center justify-center rounded-tr-3xl bg-color-yellow py-3"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="white"
        class="h-8 sm:h-12"
        :class="{ 'rotate-180': rotation_svg }"
      >
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM376.9 294.6L269.8 394.5c-3.8 3.5-8.7 5.5-13.8 5.5s-10.1-2-13.8-5.5L135.1 294.6c-4.5-4.2-7.1-10.1-7.1-16.3c0-12.3 10-22.3 22.3-22.3l57.7 0 0-96c0-17.7 14.3-32 32-32l32 0c17.7 0 32 14.3 32 32l0 96 57.7 0c12.3 0 22.3 10 22.3 22.3c0 6.2-2.6 12.1-7.1 16.3z"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    name: {
      required: true,
      type: String,
    },
  },
  emits: ["open-panel-list"],
  setup(_, ctx) {
    //values
    const rotation_svg = ref<boolean>(false);

    //functions
    const open_panel_list = () => {
      rotation_svg.value = !rotation_svg.value;
      ctx.emit("open-panel-list", rotation_svg.value);
    };

    return { rotation_svg, open_panel_list };
  },
});
</script>

<style scoped></style>

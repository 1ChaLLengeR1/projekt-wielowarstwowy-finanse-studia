<template>
  <header class="relative z-10 flex h-16 w-full justify-end p-2">
    <div class="flex items-center justify-center gap-1">
      <open-button-navigation
        buttonName="Menu"
        @button-information="openSliderBar"
      ></open-button-navigation>
    </div>
  </header>
</template>

<script lang="ts">
//compontes
import OpenButtonNavigation from "./OpenButtonNavigation.vue";

import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    "open-button-navigation": OpenButtonNavigation,
  },
  emits: ["open-sliderbar"],
  setup(_, ctx) {
    //values

    //functions
    const openSliderBar = (val: { id: String; value: boolean }) => {
      ctx.emit("open-sliderbar", { id: val.id, value: val.value });
    };

    return { openSliderBar };
  },
});
</script>

<style scoped></style>

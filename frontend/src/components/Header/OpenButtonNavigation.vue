<template>
  <button
    type="button"
    @click="openNavigation(buttonName)"
    class="flex w-32 items-center gap-1 rounded-xl bg-color-bg-dark p-2 text-sm text-white duration-500 hover:scale-105 sm:w-40 sm:bg-color-bg sm:text-lg"
  >
    <img src="../../images/logo_menu.webp" alt="logo_button" class="h-7 w-7" />
    {{ buttonName }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    buttonName: {
      required: true,
      type: String,
    },
  },
  emits: ["button-information"],
  setup(_, ctx) {
    const openNavigation = (name: String) => {
      if (name === "Menu Patryk") {
        ctx.emit("button-information", { id: "patryk", value: true });
      } else {
        ctx.emit("button-information", { id: "artek", value: true });
      }
    };
    return { openNavigation };
  },
});
</script>

<style scoped></style>

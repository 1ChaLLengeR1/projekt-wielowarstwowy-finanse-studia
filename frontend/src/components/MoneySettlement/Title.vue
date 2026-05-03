<template>
  <div class="w-full text-center">
    <h1 class="font-syne text-3xl font-bold text-white sm:text-[50px]">
      {{ name }}
    </h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: {
      required: true,
      type: String,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>

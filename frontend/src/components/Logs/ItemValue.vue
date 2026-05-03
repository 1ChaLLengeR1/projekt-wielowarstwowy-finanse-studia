<template>
  <th
    class="flex w-20 items-center justify-center bg-color-bg-dark p-3 text-[10px] sm:w-40 sm:text-sm lg:w-80"
    :class="{
      'text-color-yellow': name === 'yoho',
      'text-color-grey': name !== 'yoho',
    }"
  >
    {{ name }}
  </th>
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

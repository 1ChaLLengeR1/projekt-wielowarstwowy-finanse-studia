<template>
  <th
    class="w-20 bg-color-bg-dark p-2 text-sm text-color-yellow sm:w-40 sm:text-xl lg:w-80"
    :class="{
      'rounded-tl-lg': rounded === 'left',
      'rounded-tr-lg': rounded === 'right',
      'rounded-none': rounded === 'none',
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
    rounded: {
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

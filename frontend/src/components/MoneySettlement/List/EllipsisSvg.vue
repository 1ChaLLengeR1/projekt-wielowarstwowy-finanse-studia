<template>
  <div
    :style="{ padding: padding, 'background-color': bg }"
    class="flex cursor-pointer items-center justify-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      :style="{ fill: color, height: height }"
    >
      <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
      <path
        d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112A56 56 0 1 1 384 200z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    color: {
      required: true,
      type: String,
    },
    height: {
      required: true,
      type: String,
    },
    padding: {
      required: true,
      type: String,
    },
    bg: {
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
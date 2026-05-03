<template>
  <div class="flex gap-3">
    <button
      class="w-16 rounded-lg bg-color-bg-dark p-3 text-xl text-color-yellow"
      @click="item_logs(10)"
    >
      10
    </button>
    <button
      class="w-16 rounded-lg bg-color-bg-dark p-3 text-xl text-color-yellow"
      @click="item_logs(30)"
    >
      30
    </button>
    <button
      class="w-16 rounded-lg bg-color-bg-dark p-3 text-xl text-color-yellow"
      @click="item_logs(100)"
    >
      100
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["number-logs"],
  setup(_, ctx) {
    //functions
    const item_logs = (int: number) => {
      ctx.emit("number-logs", int);
    };
    return { item_logs };
  },
});
</script>

<style scoped></style>

<template>
  <div
    class="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white/30 p-3 backdrop-blur-md"
  >
    <div
      class="flex h-64 w-[40rem] flex-col justify-center gap-3 rounded-3xl bg-color-bg p-3"
    >
      <div class="flex h-full w-full items-center justify-center">
        <p class="font-syne text-3xl font-bold text-color-yellow">
          {{ confirmBoxStore.info }}
        </p>
      </div>
      <form class="flex h-full w-full items-end justify-end gap-3">
        <button
          class="w-28 bg-green-700 p-1 font-syne font-bold"
          @click.prevent="submitYes"
        >
          Tak
        </button>
        <button
          class="w-28 bg-red-700 p-1 font-syne font-bold"
          @click.prevent="submitNo"
        >
          Nie
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ConfirmBoxStore } from "@/stores/modals/confirmBox";

export default defineComponent({
  setup() {
    const confirmBoxStore = ConfirmBoxStore();

    const submitNo = () => {
      confirmBoxStore.isActice = false;
      confirmBoxStore.closeBox();
    };
    const submitYes = async () => {
      confirmBoxStore.confirmBox();
    };
    return { confirmBoxStore, submitNo, submitYes };
  },
});
</script>

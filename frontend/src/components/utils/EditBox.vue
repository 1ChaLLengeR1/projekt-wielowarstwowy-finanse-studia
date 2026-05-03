<template>
  <main
    class="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center gap-12 bg-color-bg-dark"
  >
    <div class="flex w-full items-center justify-center">
      <slot></slot>
    </div>
    <div class="flex w-full justify-center gap-3">
      <Button label="Submit" severity="success" @click="submitHandler()" />
      <Button
        label="Close"
        severity="danger"
        @click="editBoxStore.closeBox()"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// stores
import { EditBoxStore } from "@/stores/modals/editbox";

// components
import Button from "primevue/button";

export default defineComponent({
  components: {
    Button,
  },
  setup() {
    const editBoxStore = EditBoxStore();

    return { submitHandler: editBoxStore.submitHandler, editBoxStore };
  },
});
</script>

<style scoped></style>

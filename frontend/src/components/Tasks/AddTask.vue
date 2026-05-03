<template>
  <div class="w-full bg-color-bg-dark p-3">
    <form class="flex w-full flex-col gap-3">
      <div class="flex w-full flex-col gap-3 sm:flex-row">
        <div
          v-for="(input, index) in inputs"
          :key="index"
          class="flex w-full gap-1 bg-color-bg p-1"
        >
          <div
            v-if="input.type === 'checkbox'"
            class="flex items-center justify-start gap-2"
          >
            <input
              type="checkbox"
              v-model="input.vModel"
              class="h-6 w-full bg-color-bg-dark text-white outline-none"
            />
            <span class="text-white">{{ t(input.placeholder) }}</span>
          </div>
          <div v-else class="w-full">
            <input
              :type="input.type"
              :placeholder="t(input.placeholder)"
              v-model="input.vModel"
              class="w-full bg-color-bg-dark p-3 text-white outline-none"
            />
          </div>
        </div>

        <div class="w-full p-1">
          <button
            class="h-full w-full bg-color-yellow p-3 font-syne font-bold sm:rounded-tr-3xl"
            @click.prevent="handlerSubmit"
          >
            {{ t("pages.tasks.button.addTask") }}
          </button>
        </div>
      </div>
      <div v-if="errorMessage" class="mt-2 text-red-500">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { Ref } from "vue";
import { useI18n } from "vue-i18n";

// stores
import { ApiTaskStore } from "@/stores/tasks/apiTasks";
import { LoadingSpinnerStore } from "@/stores/modals/spinner";

// types
type InputField = {
  type: "text" | "number" | "checkbox";
  placeholder: string;
  vModel: Ref<string | number | boolean | null>;
};
export default defineComponent({
  setup() {
    const apiTaskStore = ApiTaskStore();
    const loadingSpinnerStore = LoadingSpinnerStore();
    const { t } = useI18n();
    const inputDescription = ref<string | null>(null);
    const inputTime = ref<number | null>(null);
    const inputActive = ref<boolean | null>(true);
    const errorMessage = ref<string | null>(null);

    const inputs = ref<InputField[]>([
      {
        type: "text",
        placeholder: "pages.tasks.placeholder.description",
        vModel: inputDescription,
      },
      {
        type: "number",
        placeholder: "pages.tasks.placeholder.time",
        vModel: inputTime,
      },
      {
        type: "checkbox",
        placeholder: "pages.tasks.placeholder.active",
        vModel: inputActive,
      },
    ]);

    const handlerSubmit = async () => {
      errorMessage.value = null;
      if (!inputDescription.value || inputDescription.value.trim() === "") {
        errorMessage.value = "Description cannot be empty!";
        setTimeout(() => {
          errorMessage.value = null;
        }, 5000);
        return;
      }

      if (!inputTime.value || isNaN(inputTime.value)) {
        errorMessage.value = "Time cannot be empty and must be a valid number!";
        setTimeout(() => {
          errorMessage.value = null;
        }, 5000);
        return;
      }

      const body = {
        description: inputDescription.value!,
        time: inputTime.value!,
        active: inputActive.value!,
      };
      loadingSpinnerStore.isLoading = true;
      const isSubmit = await apiTaskStore.apiCreateTaskF(body);
      if (isSubmit) {
        inputDescription.value = null;
        inputTime.value = null;
        inputActive.value = true;
      }
      loadingSpinnerStore.isLoading = false;
    };

    return {
      inputs,
      inputDescription,
      inputTime,
      inputActive,
      errorMessage,
      handlerSubmit,
      t,
    };
  },
});
</script>

<style scoped></style>

<template>
  <div
    class="flex w-full flex-col items-center justify-center gap-3 rounded-3xl bg-color-bg-dark p-2 sm:gap-5 lg:h-32 xl:w-3/6"
  >
    <h1 class="font-syne text-xl uppercase text-color-yellow lg:text-[60px]">
      {{ t("pages.fuelCalculator.header") }}
    </h1>
    <p
      v-if="pattern !== '' && price !== 0"
      class="text-center text-sm text-color-yellow-light lg:text-2xl"
    >
      {{ pattern }} =
      <span class="text-color-grey"> {{ result }}zł</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  props: {
    pattern: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const result = computed(() => {
      return props.price.toFixed(2);
    });
    return { result, t };
  },
});
</script>

<style scoped></style>

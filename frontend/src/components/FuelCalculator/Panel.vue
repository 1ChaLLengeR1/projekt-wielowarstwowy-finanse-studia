<template>
  <div class="relative w-full rounded-3xl bg-color-bg-dark p-3 xl:w-3/6">
    <img
      src="../../images/dystrybutor.png"
      alt="image_distributor"
      class="absolute right-[-5.5rem] top-[-0.1rem] -z-0 hidden h-5/6 xl:block"
    />
    <div
      class="to-#121D35 flex w-full flex-col items-center gap-3 rounded-3xl bg-gradient-to-b from-yellow-600 from-10% to-90% p-2"
    >
      <h1 class="py-4 font-syne text-xl font-bold sm:text-3xl">
        {{ t("pages.fuelCalculator.description") }}
      </h1>
      <form class="flex w-full flex-col gap-9">
        <InputFuelVue
          type_input="number"
          :name_label="t('pages.fuelCalculator.placeholder.combustion')"
          type="combustion"
          @update-number="updateNumber"
        />
        <InputFuelVue
          type_input="number"
          :name_label="t('pages.fuelCalculator.placeholder.fuel')"
          type="fuel"
          @update-number="updateNumber"
        />
        <InputFuelVue
          type_input="number"
          :name_label="t('pages.fuelCalculator.placeholder.way')"
          type="way"
          @update-number="updateNumber"
        />
        <InputFuelVue
          type_input="number"
          :name_label="t('pages.fuelCalculator.placeholder.remaining_values')"
          type="remaining_values"
          @update-number="updateNumber"
        />
        <ButtonFuelVue @click.prevent="submit" />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useI18n } from "vue-i18n";

//commponets
import InputFuelVue from "./InputFuel.vue";
import ButtonFuelVue from "./ButtonFuel.vue";

export default defineComponent({
  emits: ["calculator-values"],
  components: {
    InputFuelVue,
    ButtonFuelVue,
  },
  setup(_, ctx) {
    const { t } = useI18n();
    const input_values = reactive<{
      way: number;
      fuel: number;
      combustion: number;
      remaining_values: number;
    }>({
      way: 0,
      fuel: 0,
      combustion: 0,
      remaining_values: 0,
    });

    const updateNumber = (val: {
      type: keyof typeof input_values;
      number: number;
    }) => {
      input_values[`${val.type}`] = val.number;
    };

    const submit = () => {
      ctx.emit("calculator-values", input_values);
    };
    return { input_values, updateNumber, submit, t };
  },
});
</script>

<template>
  <main
    class="flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center gap-3 p-3"
  >
    <Result
      :pattern="fuelCalculationStore.schemaPattern.pattern"
      :price="fuelCalculationStore.schemaPattern.price"
    />
    <Panel @calculator-values="handlerSubmit" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { savePage } from "@/composable/navigation";

// stores
import { LogStore } from "@/stores/log/log";
import { FuelCalculationStore } from "@/stores/fuelCalculator/fuel";

//componets
import Result from "../components/FuelCalculator/Result.vue";
import Panel from "../components/FuelCalculator/Panel.vue";
import { paths } from "@/utils/paths";

export default defineComponent({
  components: {
    Result,
    Panel,
  },
  setup() {
    const logStore = LogStore();
    const fuelCalculationStore = FuelCalculationStore();

    (async () => {
      await logStore.apiCreateLog("Kalkulator_Paliw");
    })();

    const handlerSubmit = async (val: {
      way: number | 0;
      fuel: number | 0;
      combustion: number | 0;
      remaining_values: number | 0;
    }) => {
      const body = {
        way: val.way,
        fuel: val.fuel,
        combustion: val.combustion,
        remaining_values: val.remaining_values,
      };
      await fuelCalculationStore.apiFuelCalculation(body);
    };

    savePage(paths.fuelcalculator);
    return { fuelCalculationStore, handlerSubmit };
  },
});
</script>

<style scoped></style>

<template>
  <div class="w-full">
    <form class="flex w-full justify-center gap-3">
      <base-input
        type_input="text"
        type="name"
        :value="name"
        width="sm:w-52"
        @input-update="inputUpdate"
      ></base-input>
      <base-input
        type_input="number"
        type="amount"
        :value="amount"
        @input-update="inputUpdate"
      ></base-input>
      <button
        class="w-full bg-color-yellow p-1 font-syne font-bold sm:w-64 sm:p-3"
        @click.prevent="submit"
      >
        Zapisz
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

//componets
import BaseInput from "./BaseInput.vue";

// stores
import { MoneySettlementStore } from "@/stores/moneySettlement/moneySettlement";

export default defineComponent({
  components: {
    "base-input": BaseInput,
  },
  props: {
    id: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    amount: {
      required: true,
      type: Number,
    },
  },
  setup(props) {
    const moneySettlementStore = MoneySettlementStore();
    const inputsValue = reactive<{
      name: string;
      amount: number | string;
    }>({
      name: props.name,
      amount: props.amount,
    });

    const inputUpdate = (
      type: keyof typeof inputsValue,
      value: string | number,
    ) => {
      if (type === "name") {
        inputsValue[type] = value as string;
      } else if (type === "amount") {
        inputsValue[type] = value;
      }
    };

    const submit = async () => {
      const body = {
        id: props.id,
        name: inputsValue.name as string,
        amount: (inputsValue.amount as number) ?? 0,
      };
      await moneySettlementStore.apiEditItem(body);
    };

    return { inputUpdate, submit };
  },
});
</script>

<style scoped></style>

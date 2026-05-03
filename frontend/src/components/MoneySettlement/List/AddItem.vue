<template>
  <div class="w-full">
    <form class="flex w-full flex-wrap justify-center gap-3">
      <BaseInput
        type_input="text"
        :value="inputValue.name"
        type="name"
        :placeholder="t('pages.moneySettlement.placeholder.name')"
        @input-update="inputUpdate"
      />
      <BaseInput
        type_input="number"
        :value="inputValue.amount"
        type="amount"
        :placeholder="t('pages.moneySettlement.placeholder.amount')"
        @input-update="inputUpdate"
      />
      <button
        class="w-full bg-color-yellow p-1 font-syne font-bold sm:w-64 sm:p-3"
        @click.prevent="submitAdd"
      >
        {{ t("pages.moneySettlement.button.addItem") }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useI18n } from "vue-i18n";

//componets
import BaseInput from "./BaseInput.vue";

// stores
import { MoneySettlementStore } from "@/stores/moneySettlement/moneySettlement";

export default defineComponent({
  props: {
    id_name: {
      required: true,
      type: String,
    },
  },
  components: {
    BaseInput,
  },
  setup(props) {
    const { t } = useI18n();
    const moneySettlementStore = MoneySettlementStore();
    const inputValue = reactive<{
      name: string;
      amount: number | string | null;
    }>({
      name: "",
      amount: null,
    });

    const inputUpdate = (
      type: keyof typeof inputValue,
      value: string | number,
    ) => {
      if (type === "name") {
        inputValue[type] = value as string;
      } else if (type === "amount") {
        inputValue[type] = value;
      }
    };

    const submitAdd = async () => {
      const body = {
        id_name: props.id_name,
        amount: inputValue.amount as number,
        name: inputValue.name as string,
      };
      await moneySettlementStore.apiAddItem(body);
    };

    return { inputValue, inputUpdate, submitAdd, t };
  },
});
</script>

<style scoped></style>

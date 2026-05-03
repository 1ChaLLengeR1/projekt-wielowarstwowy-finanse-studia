<template>
  <div class="w-full bg-color-bg-dark p-3">
    <form class="flex w-full flex-col gap-3">
      <div class="flex w-full flex-col gap-3 sm:flex-row">
        <div>
          <input
            type="text"
            :placeholder="t('pages.moneySettlement.placeholder.name_list')"
            v-model="item.name_list"
            class="w-full rounded-t-3xl bg-color-bg p-3 text-white outline-none sm:rounded-[16px_0_0_0]"
          />
        </div>
        <div
          class="flex w-full flex-wrap justify-center gap-3 bg-color-bg px-2 py-7 sm:rounded-tr-3xl xl:flex-nowrap"
        >
          <div class="w-full bg-color-bg p-1">
            <input
              type="text"
              :placeholder="t('pages.moneySettlement.placeholder.name')"
              v-model="item.name"
              class="w-full bg-color-bg-dark p-3 text-white outline-none"
            />
          </div>
          <div class="w-full bg-color-bg p-1">
            <input
              type="number"
              :placeholder="t('pages.moneySettlement.placeholder.amount')"
              v-model="item.amount"
              class="w-full bg-color-bg-dark p-3 text-white outline-none"
            />
          </div>
          <div class="w-full p-1">
            <button
              class="h-full w-full bg-color-yellow p-3 font-syne font-bold sm:rounded-tr-3xl"
              @click.prevent="addItem"
            >
              {{ t("pages.moneySettlement.button.addList") }}
            </button>
          </div>
        </div>
      </div>
      <div class="w-full">
        <ul
          class="flex h-full w-full flex-wrap justify-center gap-3 bg-color-bg p-2"
          v-if="show_list"
        >
          <li
            class="flex w-40 cursor-pointer flex-col items-center justify-center gap-3 bg-color-bg-dark p-1 text-white"
            v-for="item in array_settlement"
            :key="item.id"
            @click="deleteItem(item.id)"
          >
            <p class="w-full bg-color-bg text-center">{{ item.name }}</p>
            <p class="w-full bg-color-bg text-center">{{ item.amount }}zł</p>
          </li>
        </ul>
      </div>
      <div class="w-full">
        <button
          class="w-full rounded-b-3xl bg-color-yellow py-3 font-syne text-3xl font-bold"
          :class="{ 'cursor-not-allowed': check_value_form }"
          :disabled="check_value_form"
          @click.prevent="submit"
        >
          {{ t("pages.moneySettlement.button.sendList") }}
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from "vue";
import { useI18n } from "vue-i18n";

// stores
import { MoneySettlementStore } from "@/stores/moneySettlement/moneySettlement";

export default defineComponent({
  setup() {
    const { t } = useI18n();
    const moneySettlementStore = MoneySettlementStore();
    const array_settlement = ref<
      { id: number; name: string; amount: number }[]
    >([]);

    const item = reactive<{
      name_list: string;
      name: string;
      amount: number | null;
    }>({
      name_list: "",
      name: "",
      amount: null,
    });

    const submit = async () => {
      const array_object = [];
      for (const item of array_settlement.value) {
        array_object.push({
          name: item.name,
          amount: item.amount,
        });
      }

      const body = {
        name: item.name_list,
        array_object: array_object,
      };

      const is_valid = await moneySettlementStore.apiCreateList(body);
      if (is_valid) {
        item.name_list = "";
        item.name = "";
        item.amount = 0;
        array_settlement.value = [];
      }
    };

    const addItem = () => {
      const obj = {
        id: Math.random(),
        name: item.name,
        amount: item.amount ?? 0,
      };

      array_settlement.value.push(obj);
      item.name = "";
      item.amount = null;
    };

    const deleteItem = (id: number) => {
      const find_id = array_settlement.value.findIndex(
        (element) => element.id === id,
      );
      array_settlement.value.splice(find_id, 1);
    };

    //computed
    const show_list = computed(() => {
      if (array_settlement.value.length === 0) {
        return false;
      }
      return true;
    });

    const check_value_form = computed(() => {
      if (item.name_list === "") {
        return true;
      }
      return false;
    });

    return {
      item,
      array_settlement,
      show_list,
      check_value_form,
      addItem,
      deleteItem,
      submit,
      t,
    };
  },
});
</script>

<style scoped></style>

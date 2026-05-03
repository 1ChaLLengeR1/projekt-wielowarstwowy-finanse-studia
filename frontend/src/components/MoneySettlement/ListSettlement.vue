<template>
  <div class="flex w-full flex-col gap-3 sm:w-4/6">
    <ul class="flex w-full flex-col gap-3">
      <li
        v-for="item in moneySettlementStore.collectionList"
        :key="item.id_name"
        class="flex w-full flex-col gap-3"
      >
        <NameList
          :title="item.name_overdue"
          :id="item.id_name"
          @open-list="openList"
        />
        <ItemsListVue
          v-if="item.id_name === show_list.id"
          :array="item.array_items"
          :price="item.full_price"
          :id_name="item.id_name"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from "vue";

// stores
import { MoneySettlementStore } from "@/stores/moneySettlement/moneySettlement";

//componets
import NameList from "./List/NameList.vue";
import ItemsListVue from "./List/ItemsList.vue";

export default defineComponent({
  components: {
    NameList,
    ItemsListVue,
  },
  setup() {
    const moneySettlementStore = MoneySettlementStore();
    const show_list = reactive<{ id: string }>({
      id: "",
    });

    const openList = (value: string) => {
      if (show_list.id === value) {
        show_list.id = "";
        return;
      }
      show_list.id = value;
    };

    (async () => {
      await moneySettlementStore.apiCollectionList();
    })();

    return {
      show_list,
      moneySettlementStore,
      openList,
    };
  },
});
</script>

<style scoped></style>

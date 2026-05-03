<template>
  <ul class="flex w-full flex-col gap-3 bg-color-bg-dark p-2 2xl:items-center">
    <AddItem :id_name="id_name" />
    <SumPrive :price="price" />
    <li
      v-for="item in array"
      :key="item.id"
      class="flex flex-wrap items-center justify-center gap-3 p-1 shadow-[0_0_3px_0] shadow-color-yellow sm:flex-row-reverse 2xl:flex-nowrap 2xl:shadow-none"
    >
      <ButtonsEdit :id="item.id" @open-buttons-edit="openButtonEdit" />
      <InputEdit
        v-if="showInputEdit === item.id"
        :id="item.id"
        :name="item.name"
        :amount="item.amount"
      />
      <ItemParagraf
        v-else
        :name="item.name"
        :amount="item.amount"
        :date="item.date"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

// components
import ItemParagraf from "./ItemParagraf.vue";
import SumPrive from "./SumPrive.vue";
import AddItem from "./AddItem.vue";
import ButtonsEdit from "./ButtonsEdit.vue";
import InputEdit from "../List/InputsEdit.vue";

import type { ArrayItem } from "@/types/api/outstandingMoney/types";

export default defineComponent({
  components: {
    ItemParagraf,
    SumPrive,
    AddItem,
    ButtonsEdit,
    InputEdit,
  },
  props: {
    array: {
      required: true,
      type: Array<ArrayItem>,
    },
    price: {
      required: true,
      type: Number,
    },
    id_name: {
      required: true,
      type: String,
    },
  },
  setup() {
    const showInputEdit = ref<string>("");

    const openButtonEdit = (val: string) => {
      if (showInputEdit.value == val) {
        showInputEdit.value = "";
        return;
      }
      showInputEdit.value = val;
    };

    return { showInputEdit, openButtonEdit };
  },
});
</script>

<style scoped></style>

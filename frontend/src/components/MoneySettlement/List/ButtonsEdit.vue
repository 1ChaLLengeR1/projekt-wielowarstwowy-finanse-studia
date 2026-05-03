<template>
  <div class="flex w-full justify-end gap-3">
    <EllipsisSvg
      :height="svgValues"
      bg="#FCA311"
      padding="6px"
      color="blue"
      @open-edit-panel="openEditPanel"
    />
    <SvgXmark
      :height="svgValues"
      bg="#FCA311"
      padding="6px"
      color="red"
      @click="deleteItem"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

//componets
import SvgXmark from "./SvgXmark.vue";
import EllipsisSvg from "./EllipsisSvg.vue";

// stores
import { ConfirmBoxStore } from "@/stores/modals/confirmBox";
import { MoneySettlementStore } from "@/stores/moneySettlement/moneySettlement";

export default defineComponent({
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  emits: ["open-buttons-edit", "confirm-box"],
  components: {
    SvgXmark,
    EllipsisSvg,
  },
  setup(props, ctx) {
    const confirmBoxStore = ConfirmBoxStore();
    const moneySettlementStore = MoneySettlementStore();
    const svgValues = ref<string>("40px");

    const openEditPanel = (val: boolean) => {
      ctx.emit("open-buttons-edit", props.id);
    };

    const deleteItem = async () => {
      confirmBoxStore.isActice = true;
      confirmBoxStore.setCallback(async () => {
        await moneySettlementStore.apiDeleteItem(props.id);
      });
    };

    const responseSvg = () => {
      if (window.innerWidth >= 640) {
        svgValues.value = "40px";
      } else {
        svgValues.value = "20px";
      }
    };
    window.addEventListener("resize", responseSvg);
    responseSvg();
    return { svgValues, openEditPanel, deleteItem };
  },
});
</script>

<style scoped></style>

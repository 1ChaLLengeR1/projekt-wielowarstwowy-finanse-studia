<template>
  <div class="flex w-full gap-3 bg-color-bg-dark">
    <ArrowDownVue
      :color="svg.arrow.color"
      :height="svg.arrow.height"
      padding="8px"
      bg="#FCA311"
      @click="showItemsList"
    />
    <form class="flex w-full items-center justify-center p-1">
      <p
        v-if="!inputValues.change"
        class="font-syne text-sm font-bold text-white sm:text-3xl"
      >
        {{ title }}
      </p>
      <div
        v-else
        class="flex w-full flex-col items-center justify-center gap-3 lg:flex-row"
      >
        <BaseInputVue
          :value="inputValues.title"
          type_input="text"
          type="title"
          @input-update="inputUpdate"
        />
        <button
          class="w-full bg-color-yellow p-1 font-syne text-white sm:w-64 sm:p-3"
          @click.prevent="submitEdit(id)"
        >
          Zapisz
        </button>
      </div>
    </form>
    <div class="flex justify-center gap-3">
      <EllipsisSvgVue
        :color="svg.ellipsi.color"
        :height="svg.ellipsi.height"
        padding="8px"
        bg="#FCA311"
        @click="openEdit"
      />

      <SvgXmark
        :color="svg.xmark.color"
        :height="svg.xmark.height"
        padding="8px"
        bg="#FCA311"
        @click.prevent="submitDelete(id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

// stores
import { MoneySettlementStore } from "@/stores/moneySettlement/moneySettlement";
import { ConfirmBoxStore } from "@/stores/modals/confirmBox";

//componets
import SvgXmark from "./SvgXmark.vue";
import EllipsisSvgVue from "./EllipsisSvg.vue";
import ArrowDownVue from "./ArrowDown.vue";
import BaseInputVue from "./BaseInput.vue";

export default defineComponent({
  components: {
    SvgXmark,
    EllipsisSvgVue,
    ArrowDownVue,
    BaseInputVue,
  },
  props: {
    title: {
      required: true,
      type: String,
    },
    id: {
      required: true,
      type: String,
    },
  },
  setup(props, ctx) {
    const moneySettlementStore = MoneySettlementStore();
    const confirmBoxStore = ConfirmBoxStore();
    const inputValues = reactive({
      title: props.title,
      id: props.id,
      change: false,
    });

    const svg = reactive({
      xmark: {
        color: "red",
        height: "40px",
      },
      ellipsi: {
        color: "blue",
        height: "40px",
      },
      arrow: {
        color: "white",
        height: "40px",
      },
    });

    const responseSvg = () => {
      if (window.innerWidth <= 640) {
        svg.xmark.height = `20px`;
        svg.ellipsi.height = `20px`;
        svg.arrow.height = `20px`;
      } else {
        svg.xmark.height = `40px`;
        svg.ellipsi.height = `40px`;
        svg.arrow.height = `40px`;
      }
    };

    const submitEdit = async (id: string) => {
      const body = {
        id: id,
        name: inputValues.title,
      };
      await moneySettlementStore.apiEditNameList(body);
    };

    const submitDelete = async (id: string) => {
      confirmBoxStore.isActice = true;
      confirmBoxStore.setCallback(async () => {
        await moneySettlementStore.apiDeleteList(id);
      });
    };

    const openEdit = () => {
      inputValues.change = !inputValues.change;
    };

    const showItemsList = () => {
      ctx.emit("open-list", props.id);
    };

    const inputUpdate = (
      type: keyof typeof inputValues,
      value: string | number,
    ) => {
      if (type === "title") {
        inputValues[type] = value as string;
      }
    };

    window.addEventListener("resize", responseSvg);
    responseSvg();
    return {
      svg,
      inputValues,
      inputUpdate,
      submitEdit,
      openEdit,
      submitDelete,
      showItemsList,
    };
  },
});
</script>

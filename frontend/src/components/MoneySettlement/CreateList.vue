<template>
  <div class="flex w-full flex-col gap-3 sm:w-4/6">
    <OpenPanelList
      :name="t('pages.moneySettlement.description.create')"
      @open-panel-list="open_panel_list"
    />
    <CreateList v-if="show_list" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

//commponets
import OpenPanelList from "./OpenPanelList.vue";
import CreateList from "../MoneySettlement/AddPanelList.vue";

export default defineComponent({
  emits: ["response-notification"],
  components: {
    OpenPanelList,
    CreateList,
  },
  setup() {
    const { t } = useI18n();
    const show_list = ref<boolean>(false);

    const open_panel_list = (val: boolean) => {
      show_list.value = val;
    };

    return { show_list, open_panel_list, t };
  },
});
</script>

<style scoped></style>

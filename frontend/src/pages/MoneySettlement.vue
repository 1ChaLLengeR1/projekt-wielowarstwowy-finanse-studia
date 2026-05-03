<template>
  <main
    class="flex min-h-[calc(100vh-64px)] w-full flex-col items-center gap-5 p-2"
  >
    <Title :name="t('pages.moneySettlement.header')" />
    <CreateListVue />
    <ListSettlementVue />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { savePage } from "@/composable/navigation";

// stores
import { LogStore } from "@/stores/log/log";

//componets
import Title from "@/components/MoneySettlement/Title.vue";
import CreateListVue from "@/components/MoneySettlement/CreateList.vue";
import ListSettlementVue from "@/components/MoneySettlement/ListSettlement.vue";
import { paths } from "@/utils/paths";

export default defineComponent({
  components: {
    Title,
    CreateListVue,
    ListSettlementVue,
  },
  setup() {
    const { t } = useI18n();
    const logStore = LogStore();

    (async () => {
      await logStore.apiCreateLog("Lista_Zaległych");
    })();
    savePage(paths.moneySettlement);

    return {
      t,
    };
  },
});
</script>

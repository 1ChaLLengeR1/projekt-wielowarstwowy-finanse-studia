<template>
  <main class="min-h-[calc(100vh-64px)] w-full">
    <div class="flex w-full flex-col items-center gap-3 py-3">
      <h1 class="font-syne text-3xl text-color-grey sm:pb-3 sm:text-[70px]">
        {{ t("pages.logs.header") }}
      </h1>
      <ButtonsNumberLogsVue @number-logs="getLogs" />
      <table class="flex w-full flex-col items-center gap-3">
        <thead>
          <tr class="flex gap-3">
            <ItemNameVue :name="names_table.id" rounded="left" />
            <ItemNameVue :name="names_table.description" rounded="none" />
            <ItemNameVue :name="names_table.date" rounded="right" />
          </tr>
        </thead>
        <tr
          v-for="item in logStore.collection"
          :key="item.id"
          class="flex gap-3"
        >
          <ItemValueVue :name="item.username" />
          <ItemValueVue :name="item.description" />
          <ItemValueVue :name="formatDate(item.date)" />
        </tr>
      </table>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

//components
import ItemNameVue from "../components/Logs/ItemName.vue";
import ItemValueVue from "../components/Logs/ItemValue.vue";
import ButtonsNumberLogsVue from "../components/Logs/ButtonsNumberLogs.vue";

import { LogStore } from "@/stores/log/log";
import { savePage } from "@/composable/navigation";
import { paths } from "@/utils/paths";

import { formatDate } from "@/utils/formats";

export default defineComponent({
  name: "Logs",
  components: {
    ItemNameVue,
    ItemValueVue,
    ButtonsNumberLogsVue,
  },
  setup() {
    const { t } = useI18n();
    const logStore = LogStore();

    const numberLogs = ref<number>(10);
    const names_table = reactive({
      id: "Username/Id",
      description: "Description",
      date: "Date",
    });

    (async () => {
      await logStore.apiFetchCollection(numberLogs.value);
      await logStore.apiCreateLog("Logi");
    })();

    const getLogs = async (val: number) => {
      await logStore.apiFetchCollection(val);
    };

    const changeNamesTable = () => {
      if (window.innerWidth <= 640) {
        names_table.id = "id";
        names_table.description = "de";
        names_table.date = "da";
      } else {
        names_table.id = "Username/Id";
        names_table.description = "Description";
        names_table.date = "Date";
      }
    };
    window.addEventListener("resize", changeNamesTable);
    changeNamesTable();

    savePage(paths.logs);

    return {
      names_table,
      logStore,
      getLogs,
      formatDate,
      t,
    };
  },
});
</script>

<style scoped></style>

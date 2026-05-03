<template>
  <main
    class="flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center gap-3 p-1"
  >
    <Title :name="t('pages.tasks.header')" />
    <div class="flex w-full flex-col gap-3 sm:w-4/6">
      <OpenPanelList
        :name="t('pages.tasks.description.create')"
        @open-panel-list="openPanelList"
      />
      <AddTaskPanel v-if="showList" />
      <ListTask />
      <Statistics />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { formatDate } from "@/utils/formats";
import { paths } from "@/utils/paths";
import { useI18n } from "vue-i18n";

import { savePage } from "@/composable/navigation";

// components
import Title from "@/components/MoneySettlement/Title.vue";
import OpenPanelList from "@/components/MoneySettlement/OpenPanelList.vue";
import AddTaskPanel from "@/components/Tasks/AddTask.vue";
import ListTask from "@/components/Tasks/ListTasks.vue";
import Statistics from "@/components/Tasks/Statistics.vue";

// stores
import { ApiTaskStore } from "@/stores/tasks/apiTasks";
import { LogStore } from "@/stores/log/log";

export default defineComponent({
  components: {
    Title,
    OpenPanelList,
    AddTaskPanel,
    ListTask,
    Statistics,
  },
  setup() {
    const { t } = useI18n();
    const logStore = LogStore();

    (async () => {
      await logStore.apiCreateLog("Zadania");
    })();

    const showList = ref<boolean>(false);

    const openPanelList = (val: boolean) => {
      showList.value = val;
    };

    savePage(paths.tasks);

    return { showList, t, openPanelList };
  },
});
</script>

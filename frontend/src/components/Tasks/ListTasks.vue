<template>
  <main class="flex w-full justify-center">
    <EditBoxVue v-if="editBoxStore.isActice">
      <div class="flex w-full justify-center gap-3">
        <InputText placeholder="Description" v-model="descriptionValue" />
        <InputNumber placeholder="Time" type="number" v-model="timeValue" />
      </div>
    </EditBoxVue>
    <DataTable :value="apiTaskStore.collectionTasks" showGridlines>
      <template #header>
        <div class="flex w-full justify-between">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-xl font-bold text-white">
              {{
                t("pages.tasks.table.quantity", {
                  quantity: apiTaskStore.collectionTasks.length,
                })
              }}
            </span>
          </div>
          <div class="flex w-fit gap-3">
            <Button
              :label="
                urlShowList
                  ? t('pages.tasks.button.showNotActive')
                  : t('pages.tasks.button.showActive')
              "
              :severity="urlShowList ? 'danger' : 'success'"
              text
              @click="handlerNotActiveCollection"
            />
          </div>
        </div>
      </template>
      <Column field="description" :header="t('pages.tasks.table.description')">
        <template #body="slotProps">
          <span class="text-color-yellow">{{
            slotProps.data.description
          }}</span>
        </template>
      </Column>
      <Column field="time" :header="t('pages.tasks.table.time')">
        <template #body="slotProps">
          <span class="text-color-yellow">{{
            t("pages.tasks.table.timeValue", {
              time: slotProps.data.time,
            })
          }}</span>
        </template>
      </Column>
      <Column field="active" :header="t('pages.tasks.table.status')">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.active"
            :severity="getStatus(slotProps.data.active)"
          />
        </template>
      </Column>
      <Column field="options" :header="t('pages.tasks.table.options')">
        <template #body="slotProps">
          <div class="w-m flex w-fit flex-wrap gap-3 sm:w-full">
            <Button
              :label="
                slotProps.data.active
                  ? t('pages.tasks.button.deactive')
                  : t('pages.tasks.button.active')
              "
              :severity="slotProps.data.active ? 'danger' : 'success'"
              text
              @click="
                handlerActiveTask(slotProps.data.id, slotProps.data.active)
              "
            />
            <Button
              label="Delete"
              severity="danger"
              text
              @click="handlerDeleteTask(slotProps.data.id)"
            />
            <Button
              label="Edit"
              severity="info"
              text
              @click="
                handlerTaskEdit(
                  slotProps.data.id,
                  slotProps.data.description,
                  slotProps.data.time,
                )
              "
            />
          </div>
        </template>
      </Column>
      <Column
        field=""
        :header="t('pages.tasks.table.datetime')"
        class="flex flex-col gap-3"
      >
        <template #body="slotProps">
          <span class="text-green-500"
            >{{
              t("pages.tasks.table.createdAt", {
                created_at: formatDate(slotProps.data.created_at),
              })
            }}
          </span>
          <span class="text-blue-500">{{
            t("pages.tasks.table.updatedAt", {
              updated_at: formatDate(slotProps.data.updated_at),
            })
          }}</span>
        </template>
      </Column>
    </DataTable>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { formatDate } from "@/utils/formats";

// stores
import { ApiTaskStore } from "@/stores/tasks/apiTasks";
import { LoadingSpinnerStore } from "@/stores/modals/spinner";
import { ConfirmBoxStore } from "@/stores/modals/confirmBox";
import { EditBoxStore } from "@/stores/modals/editbox";

// components
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import Button from "primevue/button";
import Tag from "primevue/tag";
import EditBoxVue from "@/components/utils/EditBox.vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";

export default defineComponent({
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
    Button,
    Tag,
    EditBoxVue,
    InputText,
    InputNumber,
  },
  setup() {
    const { t } = useI18n();
    const apiTaskStore = ApiTaskStore();
    const loadingSpinnerStore = LoadingSpinnerStore();
    const confirmBoxStore = ConfirmBoxStore();
    const editBoxStore = EditBoxStore();
    const urlShowList = ref<boolean>(true);
    const router = useRouter();
    const route = useRoute();
    const timeValue = ref<number | null>(null);
    const descriptionValue = ref<string | null>(null);

    const getStatus = (status: boolean): "success" | "danger" | undefined => {
      switch (status) {
        case true:
          return "success";

        case false:
          return "danger";

        default:
          return undefined;
      }
    };

    const handlerActiveTask = async (taskId: string, active: boolean) => {
      const body = {
        active: !active,
      };
      loadingSpinnerStore.isLoading = true;
      await apiTaskStore.apiUpdateActiveTaskF(taskId, body, urlShowList.value);
      loadingSpinnerStore.isLoading = false;
    };

    const handlerDeleteTask = async (taskId: string) => {
      confirmBoxStore.isActice = true;
      confirmBoxStore.setCallback(async () => {
        loadingSpinnerStore.isLoading = true;
        await apiTaskStore.apiDeleteTaskF(taskId);
        loadingSpinnerStore.isLoading = false;
      });
    };

    const handlerTaskEdit = async (
      taskId: string,
      description: string,
      time: number,
    ) => {
      editBoxStore.isActice = true;
      descriptionValue.value = description;
      timeValue.value = time;

      editBoxStore.setCallback(async () => {
        loadingSpinnerStore.isLoading = true;
        await apiTaskStore.apiUpdateTaskF(taskId, {
          description: descriptionValue.value!,
          time: timeValue.value!,
        });
        loadingSpinnerStore.isLoading = false;
      });
    };

    const handlerNotActiveCollection = async () => {
      loadingSpinnerStore.isLoading = true;
      urlShowList.value = !urlShowList.value;
      await router.push({
        query: {
          ...route.query,
          active: String(urlShowList.value),
        },
      });
      await apiTaskStore.apiGetTasks(true, urlShowList.value);
      loadingSpinnerStore.isLoading = false;
    };

    (async function runActions() {
      loadingSpinnerStore.isLoading = true;

      const activeParam = route.query.active;
      const isActive = activeParam !== "false";

      urlShowList.value = isActive;

      await apiTaskStore.apiGetTasks(false, isActive);

      loadingSpinnerStore.isLoading = false;
    })();

    return {
      urlShowList,
      apiTaskStore,
      editBoxStore,
      timeValue,
      descriptionValue,
      t,
      formatDate,
      getStatus,
      handlerActiveTask,
      handlerNotActiveCollection,
      handlerDeleteTask,
      handlerTaskEdit,
    };
  },
});
</script>

<style scoped>
:deep(.p-datatable) {
  background-color: transparent;
  --p-datatable-header-background: transparent;
  --p-datatable-row-background: transparent;
  width: 100%;
}

:deep(.p-datatable .p-datatable-wrapper) {
  width: 100%;
}

:deep(.p-datatable-table) {
  width: 100%;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: transparent !important;
  color: white;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  background-color: transparent;
}
</style>

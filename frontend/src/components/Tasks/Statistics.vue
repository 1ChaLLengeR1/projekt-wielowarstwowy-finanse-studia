<template>
  <div>
    <div class="flex w-full flex-wrap items-end gap-4">
      <div class="flex flex-col space-y-1">
        <label for="start" class="text-sm font-medium text-gray-700">Od</label>
        <DatePicker
          id="start"
          v-model="startDate"
          placeholder="Rozpoczęcie"
          class="w-40"
        />
      </div>

      <div class="flex flex-col space-y-1">
        <label for="end" class="text-sm font-medium text-gray-700">Do</label>
        <DatePicker
          id="end"
          v-model="endDate"
          placeholder="Zakończenie"
          class="w-40"
        />
      </div>
    </div>

    <Chart
      v-if="hasStatisticsData"
      type="bar"
      :data="chartData"
      :options="chartOptions"
    />

    <div
      v-if="hasStatisticsData"
      class="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-800 md:grid-cols-4"
    >
      <div class="rounded bg-white p-3 text-center shadow">
        <div class="text-lg font-semibold">
          {{ apiTaskStore.collectionStatisticsTask?.total_tasks }}
        </div>
        <div class="text-gray-500">Liczba zadań</div>
      </div>
      <div class="rounded bg-white p-3 text-center shadow">
        <div class="text-lg font-semibold">
          {{ apiTaskStore.collectionStatisticsTask?.total_time }} min
        </div>
        <div class="text-gray-500">Łączny czas</div>
      </div>
      <div class="rounded bg-white p-3 text-center shadow">
        <div class="text-lg font-semibold">
          {{
            apiTaskStore.collectionStatisticsTask?.average_per_week.toFixed(2)
          }}
        </div>
        <div class="text-gray-500">Zadań / tydzień</div>
      </div>
      <div class="rounded bg-white p-3 text-center shadow">
        <div class="text-lg font-semibold">
          {{
            apiTaskStore.collectionStatisticsTask?.average_time_per_week.toFixed(
              2,
            )
          }}
          min
        </div>
        <div class="text-gray-500">Czas / tydzień</div>
      </div>
    </div>
    <div
      v-if="!hasStatisticsData"
      class="flex w-full justify-center p-3 text-center text-lg font-semibold shadow"
    >
      Na chwilę obecną brak danych.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from "vue";
import { useI18n } from "vue-i18n";

// types
import type { ChartData, ChartOptions } from "chart.js";

// stores
import { ApiTaskStore } from "@/stores/tasks/apiTasks";
import { LoadingSpinnerStore } from "@/stores/modals/spinner";

// components
import Chart from "primevue/chart";
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";

export default defineComponent({
  components: {
    Chart,
    DatePicker,
    Button,
  },
  setup() {
    const { t } = useI18n();
    const apiTaskStore = ApiTaskStore();
    const loadingSpinnerStore = LoadingSpinnerStore();

    const chartData = ref<ChartData<"bar">>();
    const chartOptions = ref<ChartOptions<"bar">>();

    const hasStatisticsData = computed(() => {
      const stats = apiTaskStore.collectionStatisticsTask;
      return !!stats && stats.total_tasks > 0;
    });

    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() - 7);

    const startDate = ref<Date>(nextWeek);
    const endDate = ref<Date>(today);

    const toIsoDate = (date: Date): string => date.toISOString().split("T")[0];

    const renderChart = () => {
      const tasksPerDay =
        apiTaskStore.collectionStatisticsTask?.tasks_per_day || {};
      const maxValue = Math.max(...Object.values(tasksPerDay));

      const labels = Object.keys(tasksPerDay);
      const data = Object.values(tasksPerDay);

      chartData.value = {
        labels: labels,
        datasets: [
          {
            label: "Liczba zadań dziennie",
            backgroundColor: "#42A5F5",
            data: data,
          },
        ],
      };

      chartOptions.value = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Wykres zadań dziennych",
          },
        },
        scales: {
          x: {
            ticks: {
              maxRotation: 90,
              minRotation: 45,
            },
          },
          y: {
            beginAtZero: true,
            suggestedMax: Math.max(1, maxValue + 1),
            ticks: {
              stepSize: 1,
              color: "#aaa",
              callback: function (value) {
                return Number(value).toFixed(0);
              },
            },
          },
        },
      };
    };

    onMounted(async () => {
      loadingSpinnerStore.isLoading = true;
      await apiTaskStore.apiGetStatisticsTaskF(
        toIsoDate(startDate.value),
        toIsoDate(endDate.value),
      );
      loadingSpinnerStore.isLoading = false;
      renderChart();
    });

    watch([startDate, endDate], async ([newStart, newEnd]) => {
      if (newStart && newEnd) {
        loadingSpinnerStore.isLoading = true;
        await apiTaskStore.apiGetStatisticsTaskF(
          toIsoDate(newStart),
          toIsoDate(newEnd),
        );
        loadingSpinnerStore.isLoading = false;
        renderChart();
      }
    });

    return {
      chartData,
      chartOptions,
      startDate,
      endDate,
      apiTaskStore,
      hasStatisticsData,
    };
  },
});
</script>

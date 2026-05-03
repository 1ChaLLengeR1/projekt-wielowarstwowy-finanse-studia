<template>
  <main
    class="flex h-screen w-full items-center justify-center bg-[url('../images/loginPanel/background.webp')] px-1"
  >
    <div
      class="flex w-96 flex-col items-center gap-5 rounded-[8px_0_8px_0] bg-color-bg px-2 py-5 sm:shadow-[21px_21px_4px_0_rgba(0,0,0,0.25)]"
    >
      <div class="w-full py-10 text-center">
        <h2 class="font-syne text-2xl text-white">
          {{ t("pages.login.header") }}
        </h2>
      </div>
      <form class="flex w-64 flex-col items-center justify-center gap-2">
        <div class="relative mb-5 flex w-full justify-center">
          <SvgUserVue />
          <input
            type="text"
            :placeholder="t('pages.login.input.username')"
            class="w-full rounded-lg bg-color-yellow py-3 pl-14 pr-1 text-xl outline-none"
            v-model="inputData.username"
          />
        </div>
        <div class="relative mb-6 mt-5 flex w-full justify-center">
          <SvgPasswordVue />
          <input
            :type="input_type"
            :placeholder="t('pages.login.input.password')"
            class="w-full rounded-lg bg-color-yellow py-3 pl-14 pr-9 text-xl outline-none"
            v-model="inputData.password"
          />
          <SvgEyeVue :type="input_type" @show-password="changePassword" />
        </div>
        <div
          v-if="errorInformation.show"
          class="flex w-full items-center gap-3 rounded-lg bg-[#192D57] p-2 shadow-[0_7px_2px_0_rgba(0,0,0,0.25)]"
        >
          <div class="rounded-[8px_8px_0_8px] bg-color-bg px-2">
            <p class="text-lg font-bold text-[#192D57]">
              {{ errorInformation.status }}
            </p>
          </div>
          <div>
            <p class="text-xs text-white">
              {{ errorInformation.description }}
            </p>
          </div>
        </div>
        <div class="w-full">
          <button
            @click.prevent="handlerLogin"
            class="mb-14 mt-20 w-full rounded-xl bg-color-yellow p-3 font-syne text-3xl font-bold"
          >
            {{ t("pages.login.button.login") }}
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { navigationPage } from "@/composable/navigation";

// stores
import { LoadingSpinnerStore } from "@/stores/modals/spinner";
import { AuthStore } from "@/stores/auth/auth";

// componets
import LoadingSpinnerVue from "@/components/utils/LoadingSpinner.vue";
import SvgEyeVue from "../components/LoginPanel/SvgEye.vue";
import SvgPasswordVue from "../components/LoginPanel/SvgPassword.vue";
import SvgUserVue from "../components/LoginPanel/SvgUser.vue";

// types
import type { Auth } from "@/types/auth/types";

export default defineComponent({
  name: "LoginPanel",
  components: {
    LoadingSpinnerVue,
    SvgEyeVue,
    SvgPasswordVue,
    SvgUserVue,
  },
  setup() {
    const { t } = useI18n();
    const authStore = AuthStore();
    const loadingSpinnerStore = LoadingSpinnerStore();
    const inputData = reactive<{ username: string; password: string }>({
      username: "",
      password: "",
    });
    const errorInformation = reactive<{
      status: string;
      description: string;
      show: boolean;
    }>({
      status: "",
      description: "",
      show: false,
    });
    const input_type = ref<string>("password");

    const handlerLogin = async () => {
      const body = {
        username: inputData.username,
        password: inputData.password,
      };
      loadingSpinnerStore.isLoading = true;
      const response = await authStore.apiLogin(body);
      if ("id" in response) {
        navigationPage();
      } else {
        errorInformation.status = "Error";
        errorInformation.description = response.message;
        errorInformation.show = true;

        setTimeout(() => {
          errorInformation.status = "";
          errorInformation.description = "";
          errorInformation.show = false;
        }, 4000);
      }
      loadingSpinnerStore.isLoading = false;
    };

    const changePassword = (value: string) => {
      input_type.value = value;
    };

    return {
      inputData,
      errorInformation,
      input_type,
      handlerLogin,
      changePassword,
      t,
    };
  },
});
</script>

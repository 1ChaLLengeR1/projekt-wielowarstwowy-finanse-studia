<template>
  <main class="relative h-full w-full flex-col bg-color-bg">
    <LoadingSpinner v-if="loadingSpinnerStore.isLoading" />
    <ImageDotsVue v-if="showDots" />
    <NavigationVue v-if="authStore.auth.id" @open-sliderbar="openSliderBar" />
    <Notification />
    <ConfirmBox v-if="confirmBoxStore.isActice" />
    <div class="relative flex w-full flex-row overflow-hidden">
      <div class="w-full">
        <router-view></router-view>
      </div>

      <Transition name="slide-fade-right">
        <BlockSliderBar
          v-if="sildeBars.id === 'artek' && sildeBars.value === true"
          :site="true"
          :arrayList="arrayLinks.links_artek"
          @close-silderBar="openSliderBar"
        />
      </Transition>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from "vue";
import { pathsArtek } from "./utils/paths";

// componets
import NavigationVue from "@/components/Header/Navigation.vue";
import BlockSliderBar from "@/components/Header/BlockSliderBar.vue";
import ImageDotsVue from "@/components/App/ImageDots.vue";
import LoadingSpinner from "@/components/utils/LoadingSpinner.vue";
import Notification from "@/components/utils/Notification.vue";
import ConfirmBox from "@/components/utils/ConfirmBox.vue";
import EditBoxVue from "@/components/utils/EditBox.vue";

// stores
import { LoadingSpinnerStore } from "@/stores/modals/spinner";
import { AuthStore } from "@/stores/auth/auth";
import { ConfirmBoxStore } from "@/stores/modals/confirmBox";

// types
import type { Link } from "@/utils/paths";

export default defineComponent({
  name: "App",
  components: {
    LoadingSpinner,
    NavigationVue,
    BlockSliderBar,
    ImageDotsVue,
    Notification,
    ConfirmBox,
    EditBoxVue,
  },
  setup() {
    const loadingSpinnerStore = LoadingSpinnerStore();
    const authStore = AuthStore();
    const confirmBoxStore = ConfirmBoxStore();
    const sildeBars = reactive<{ id: string; value: boolean }>({
      id: "",
      value: false,
    });

    const showDots = ref<boolean>(false);

    const arrayLinks = reactive<{
      links_artek: Link[];
    }>({
      links_artek: pathsArtek,
    });

    //functions
    const openSliderBar = (val: { id: string; value: boolean }) => {
      sildeBars.id = val.id;
      sildeBars.value = val.value;
    };

    const check_screen = () => {
      if (window.innerWidth <= 640) {
        showDots.value = false;
      } else {
        showDots.value = true;
      }
    };
    window.addEventListener("resize", check_screen);
    check_screen();

    onMounted(async () => {
      loadingSpinnerStore.isLoading = true;
      await authStore.apiAutomaticallyLogin();
      loadingSpinnerStore.isLoading = false;
    });

    return {
      sildeBars,
      arrayLinks,
      authStore,
      showDots,
      loadingSpinnerStore,
      confirmBoxStore,
      openSliderBar,
    };
  },
});
</script>

<style scoped>
.slide-fade-right-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-right-leave-active {
  transition: all 0.5s ease-out;
}

.slide-fade-right-enter-from,
.slide-fade-right-leave-to {
  transform: translateX(120%);
}

.slide-fade-left-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-left-leave-active {
  transition: all 0.5s ease-out;
}

.slide-fade-left-enter-from,
.slide-fade-left-leave-to {
  transform: translateX(-120%);
}
</style>
./components/JS/Authentication

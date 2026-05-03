import { createRouter, createWebHistory } from "vue-router";
import { paths } from "@/utils/paths";
import { AuthStore } from "@/stores/auth/auth";

// Pages
import LoginPanel from "../pages/LoginPanel.vue";
import MoneySettlement from "../pages/MoneySettlement.vue";
import FuelCalculator from "../pages/FuelCalculator.vue";
import Logs from "@/pages/Logs.vue";
import Tasks from "@/pages/Tasks.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: paths.default,
      component: LoginPanel,
    },
    {
      path: paths.login,
      name: "loginPanel",
      component: LoginPanel,
    },
    {
      path: paths.moneySettlement,
      name: "moneySettlement",
      component: MoneySettlement,
      meta: {
        isAuth: true,
      },
    },
    {
      path: paths.fuelcalculator,
      name: "fuelCalculator",
      component: FuelCalculator,
      meta: {
        isAuth: true,
      },
    },
    {
      path: paths.logs,
      name: "logs",
      component: Logs,
      meta: {
        isAuth: true,
      },
    },
    {
      path: paths.tasks,
      name: "Tasks",
      component: Tasks,
      meta: {
        isAuth: true,
      },
    },
    { path: paths.notFound, component: Logs },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = AuthStore();
  if (to.meta.isAuth && !authStore.auth.access_token) {
    next(paths.login);
  } else {
    next();
  }
});

export default router;

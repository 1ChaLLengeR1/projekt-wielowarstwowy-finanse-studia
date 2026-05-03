import router from "@/router/index";
import { AuthStore } from "@/stores/auth/auth";
import { paths } from "@/utils/paths";

export const navigationPage = (currentPath: string = "") => {
  const authStore = AuthStore();
  const path: string = paths.moneySettlement;

  if (!authStore.auth.access_token) {
    router.push({ path: paths.login });
  }

  if (currentPath !== "") {
    setTimeout(() => {
      router.push({ path: currentPath });
    }, 300);
  }

  if (localStorage.getItem("__job_page_path") === null) {
    localStorage.setItem("__job_page_path", path);
    router.push({ path: paths.moneySettlement });
  } else {
    router.push({ path: localStorage.getItem("__job_page_path") as string });
  }
};

export const savePage = (path: string) => {
  localStorage.setItem("__job_page_path", path);
};

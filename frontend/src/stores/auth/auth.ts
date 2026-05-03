import { defineStore } from "pinia";
import { ref } from "vue";
import Cookies from "js-cookie";
import { navigationPage } from "@/composable/navigation";

// types
import type { AuthBody, Auth } from "@/types/auth/types";
import type { ApiAuth } from "@/types/api/auth/types";
import type { Error } from "@/types/global";

// api
import { automaticallyLogin } from "@/api/auth/fetch";
import { login } from "@/api/auth/post";
import { paths } from "@/utils/paths";

export const AuthStore = defineStore("authStore", () => {
  const auth = ref<Auth>({
    id: "",
    username: "",
    access_token: "",
    refresh_token: "",
  });

  const apiLogin = async (userData: AuthBody): Promise<Auth | Error> => {
    if (auth.value.id) {
      return auth.value;
    }
    const response = await login(userData);
    if (response && response.isValid) {
      const responseData = response.data as ApiAuth;
      auth.value = {
        id: responseData.id,
        username: responseData.username,
        access_token: responseData.access_token,
        refresh_token: responseData.refresh_token,
      };
      Cookies.set("__job_auth", JSON.stringify(auth.value), {
        expires: 10 / 24,
      });
      return auth.value;
    } else {
      const responseError = response.data as Error;
      return {
        message: responseError.message,
      };
    }
  };

  const apiAutomaticallyLogin = async (): Promise<boolean> => {
    const authCookies = Cookies.get("__job_auth");
    if (!authCookies) {
      navigationPage(paths.login);
      return false;
    }

    const parseAuthCookies = JSON.parse(authCookies) as Auth;
    auth.value = {
      id: parseAuthCookies.id,
      username: parseAuthCookies.username,
      access_token: parseAuthCookies.access_token,
      refresh_token: parseAuthCookies.refresh_token,
    };

    const response = await automaticallyLogin(auth.value.id);
    if (response && response.isValid) {
      const responseData = response.data as ApiAuth;
      auth.value = {
        id: responseData.id,
        username: responseData.username,
        access_token: responseData.access_token,
        refresh_token: responseData.refresh_token,
      };
      Cookies.set("__job_auth", JSON.stringify(auth.value), {
        expires: 10 / 24,
      });
      navigationPage();
      return true;
    }
    return false;
  };

  const getUser = (): { id: string; username: string } | null => {
    if (auth.value.id && auth.value.username) {
      return {
        id: auth.value.id.toString(),
        username: auth.value.username.toString(),
      };
    }
    return null;
  };

  const logOut = () => {
    auth.value = {
      id: "",
      username: "",
      access_token: "",
      refresh_token: "",
    };
    Cookies.remove("__job_auth");
    navigationPage(paths.login);
  };

  const getToken = (): string | null => {
    if (auth.value.access_token) {
      return auth.value.access_token;
    }
    return null;
  };

  const getRefreshToken = (): string | null => {
    if (auth.value.refresh_token) {
      return auth.value.refresh_token;
    }
    return null;
  };

  return {
    auth,
    apiLogin,
    apiAutomaticallyLogin,
    logOut,
    getToken,
    getRefreshToken,
    getUser,
  };
});

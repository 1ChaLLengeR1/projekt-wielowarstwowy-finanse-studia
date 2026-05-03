import type { ResponseApi, Error } from "@/types/global";

import type { Headers } from "@/types/api/common/types";
import { AuthStore } from "@/stores/auth/auth";

const DEBUG_TOKEN = false;
const DEBUG_REFRESH_TOKEN = false;
const DEBUG_USER_DATA = false;

export async function apiPost(
  urlPath: string,
  body: object,
  method: "POST" | "PATCH" | "PUT" | "DELETE" = "POST",
  lvl: number = 0,
  headers: Headers = {
    Authorization: false,
    UserData: false,
    "X-Refresh-Token": false,
  },
): Promise<ResponseApi> {
  const urlApi: string = import.meta.env.VITE_URL_SERVER;
  const url: string = `${urlApi}${urlPath}`;
  const authStore = AuthStore();

  try {
    const header = new Headers();
    header.append("Content-Type", "application/json");
    // header.append("Content-Type", "multipart/form-data");
    // header.append("Content-Type", "application/x-www-form-urlencoded");

    if (headers.Authorization && authStore.getToken()) {
      header.append("Authorization", `Bearer ${authStore.getToken()}`);
      if (DEBUG_TOKEN) {
        console.info("Token:", authStore.getToken());
      }
    }

    if (headers["X-Refresh-Token"] && authStore.getRefreshToken()) {
      header.append("X-Refresh-Token", `${authStore.getRefreshToken()}`);
      if (DEBUG_REFRESH_TOKEN) {
        console.info("Refresh Token:", authStore.getToken());
      }
    }

    if (headers.UserData && authStore.getUser()) {
      header.append("UserData", `${JSON.stringify(authStore.getUser())}`);
      if (DEBUG_USER_DATA) {
        console.info("UserData:", authStore.getUser());
      }
    }

    const response = await fetch(url, {
      headers: header,
      method: method,
      body: JSON.stringify(body),
    });

    const responseData: ResponseApi = await response.json();
    return responseData;
  } catch (error) {
    if (lvl < 3) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return apiPost(urlPath, body, method, lvl + 1, headers);
    } else {
      console.error(`${url} is not working`);
      throw error;
    }
  }
}

export async function apiPostFormData(
  urlPath: string,
  body: FormData,
  method: "POST" | "PATCH" | "PUT" | "DELETE" = "POST",
  lvl: number = 0,
  headers: Headers = {
    Authorization: false,
    UserData: false,
    "X-Refresh-Token": false,
  },
): Promise<ResponseApi> {
  const urlApi: string = import.meta.env.VITE_URL_SERVER;
  const url: string = `${urlApi}${urlPath}`;
  const authStore = AuthStore();

  try {
    const header = new Headers();
    if (headers.Authorization && authStore.getToken()) {
      header.append("Authorization", `Bearer ${authStore.getToken()}`);
      if (DEBUG_TOKEN) {
        console.info("Token:", authStore.getToken());
      }
    }

    if (headers["X-Refresh-Token"] && authStore.getRefreshToken()) {
      header.append("X-Refresh-Token", `${authStore.getRefreshToken()}`);
      if (DEBUG_REFRESH_TOKEN) {
        console.info("Refresh Token:", authStore.getToken());
      }
    }

    if (headers.UserData && authStore.getUser()) {
      header.append("UserData", `${JSON.stringify(authStore.getUser())}`);
      if (DEBUG_USER_DATA) {
        console.info("UserData:", authStore.getUser());
      }
    }

    const response = await fetch(url, {
      headers: header,
      method: method,
      body: body,
    });

    const responseData: ResponseApi = await response.json();
    return responseData;
  } catch (error) {
    if (lvl < 3) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return apiPost(urlPath, body, method, lvl + 1, headers);
    } else {
      console.error(`${url} is not working`);
      throw error;
    }
  }
}

export async function apiDownloadFile(
  urlPath: string,
  body: FormData,
  method: "POST" | "PATCH" | "PUT" | "DELETE" = "POST",
  lvl: number = 0,
  headers: Headers = {
    Authorization: false,
    UserData: false,
    "X-Refresh-Token": false,
  },
): Promise<ResponseApi> {
  const urlApi: string = import.meta.env.VITE_URL_SERVER;
  const url: string = `${urlApi}${urlPath}`;
  const authStore = AuthStore();

  try {
    const header = new Headers();

    if (headers.Authorization && authStore.getToken()) {
      header.append("Authorization", `Bearer ${authStore.getToken()}`);
    }

    if (headers["X-Refresh-Token"] && authStore.getRefreshToken()) {
      header.append("X-Refresh-Token", `${authStore.getRefreshToken()}`);
    }

    if (headers.UserData && authStore.getUser()) {
      header.append("UserData", `${JSON.stringify(authStore.getUser())}`);
    }

    const response = await fetch(url, {
      headers: header,
      method: method,
      body: body,
    });

    let error: string = "";
    if (!response.ok) {
      const responseData = await response.json();
      error = responseData.data?.error;
      throw new Error(error);
    }

    const contentLength = response.headers.get("Content-Length");
    const totalSize = contentLength ? parseInt(contentLength, 10) : 0;
    let receivedSize = 0;

    const reader = response.body?.getReader();
    const chunks = [];

    while (true) {
      const { done, value } = await reader!.read();

      if (done) {
        console.log("Koniec");
        break;
      }
      chunks.push(value);
      receivedSize += value.length;
    }

    const blob = new Blob(chunks, { type: "application/pdf" });

    const contentDisposition = response.headers.get("Content-Disposition");
    let fileName = "plik.pdf";

    if (contentDisposition) {
      const match = contentDisposition.match(/filename="(.+?)"/);
      if (match && match[1]) {
        fileName = match[1];
      }
    }

    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(downloadUrl);

    return {
      status: "SUCCESS",
      status_code: 200,
      data: "success download file!",
      additional: {},
    };
  } catch (error) {
    console.error("Błąd pobierania pliku:", error);
    return {
      status: "ERROR",
      status_code: 400,
      data: error as Error,
      additional: {},
    };
  }
}

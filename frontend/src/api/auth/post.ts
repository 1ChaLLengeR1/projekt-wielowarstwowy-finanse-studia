import { apiPost } from "@/api/common/post";
import type { ResponseData, Error } from "@/types/global";
import type { ApiAuth } from "@/types/api/auth/types";
import type { AuthBody } from "@/types/auth/types";

export async function login(body: AuthBody): Promise<ResponseData> {
  const urlPath = "/authentication/login";
  const response = await apiPost(urlPath, body, "POST", 0, {
    Authorization: false,
    UserData: false,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return the login!");
    return {
      isValid: false,
      data: response.data as Error,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: response.data as ApiAuth,
    additional: response.additional,
  };
}

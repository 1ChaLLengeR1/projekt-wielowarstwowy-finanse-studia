import { apiGet } from "@/api/common/fetch";
import type { ResponseData, Error } from "@/types/global";
import type { ApiAuth } from "@/types/api/auth/types";

export async function automaticallyLogin(
  user_id: string,
): Promise<ResponseData> {
  const urlPath = `/authentication/automatically_login/${user_id}`;
  const response = await apiGet(urlPath, 0, {
    "X-Refresh-Token": true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return the automatically login!");
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

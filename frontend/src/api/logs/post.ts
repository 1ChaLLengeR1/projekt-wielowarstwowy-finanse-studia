import { apiPost } from "@/api/common/post";
import type { ResponseData, Error } from "@/types/global";
import type { Log } from "@/types/api/logs/types";

export async function createLog(description: string): Promise<ResponseData> {
  const urlPath = `/logs/create/${description}`;
  const response = await apiPost(urlPath, {}, "POST", 0, {
    Authorization: true,
    UserData: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return create log!");
    return {
      isValid: false,
      data: response.data as Error,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: response.data as Log,
    additional: response.additional,
  };
}

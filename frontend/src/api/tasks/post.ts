import { apiPost } from "@/api/common/post";
import type { ResponseData, Error } from "@/types/global";
import type { OneTask } from "@/types/api/tasks/types";
import type { CreateTaskBody } from "@/types/tasks/type";

export async function apiCreateTask(
  body: CreateTaskBody,
): Promise<ResponseData> {
  const urlPath = "/tasks/create";
  const response = await apiPost(urlPath, body, "POST", 0, {
    Authorization: true,
    UserData: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return create task!");
    return {
      isValid: false,
      data: response.data as Error,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: response.data as OneTask,
    additional: response.additional,
  };
}

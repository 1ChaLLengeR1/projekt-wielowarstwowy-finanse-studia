import { apiPost } from "@/api/common/post";
import type { ResponseData, Error } from "@/types/global";
import type { OneTask } from "@/types/api/tasks/types";

export async function apiDeleteTask(task_id: string): Promise<ResponseData> {
  const urlPath = `/tasks/delete/${task_id}`;
  const response = await apiPost(urlPath, {}, "DELETE", 0, {
    Authorization: true,
    UserData: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return delete task!");
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

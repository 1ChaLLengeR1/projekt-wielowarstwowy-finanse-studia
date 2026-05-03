import { apiPost } from "@/api/common/post";
import type { ResponseData, Error } from "@/types/global";
import type {
  ApiDeleteList,
  ApiDeleteItem,
} from "@/types/api/outstandingMoney/types";

export async function outStandingMoneyDeleteList(
  id: string,
): Promise<ResponseData> {
  const urlPath = `/outstanding_money/delete_list/${id}`;
  const response = await apiPost(urlPath, {}, "DELETE", 0, {
    Authorization: true,
    UserData: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return delete list!");
    return {
      isValid: false,
      data: response.data as Error,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: response.data as ApiDeleteList,
    additional: response.additional,
  };
}

export async function outStandingMoneyDeleteItem(
  id: string,
): Promise<ResponseData> {
  const urlPath = `/outstanding_money/delete_item/${id}`;
  const response = await apiPost(urlPath, {}, "DELETE", 0, {
    Authorization: true,
    UserData: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return delete item!");
    return {
      isValid: false,
      data: response.data as Error,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: response.data as ApiDeleteItem,
    additional: response.additional,
  };
}

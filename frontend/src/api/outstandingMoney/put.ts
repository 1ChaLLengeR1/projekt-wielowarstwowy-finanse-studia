import { apiPost } from "@/api/common/post";
import type { ResponseData, Error } from "@/types/global";
import type {
  EditNameListBody,
  EditItemBody,
} from "@/types/outstandingMoney/types";
import type {
  ApiEditNameList,
  ApiEditItem,
} from "@/types/api/outstandingMoney/types";

export async function outStandingMoneyEditNameList(
  body: EditNameListBody,
): Promise<ResponseData> {
  const urlPath = "/outstanding_money/edit_name_list";
  const response = await apiPost(urlPath, body, "PUT", 0, {
    Authorization: true,
    UserData: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return edit name list!");
    return {
      isValid: false,
      data: response.data as Error,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: response.data as ApiEditNameList,
    additional: response.additional,
  };
}

export async function outStandingMoneyEditItem(
  body: EditItemBody,
): Promise<ResponseData> {
  const urlPath = "/outstanding_money/edit_item";
  const response = await apiPost(urlPath, body, "PUT", 0, {
    Authorization: true,
    UserData: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return edit item!");
    return {
      isValid: false,
      data: response.data as Error,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: response.data as ApiEditItem,
    additional: response.additional,
  };
}

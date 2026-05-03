import { apiPost } from "@/api/common/post";
import type { ResponseData, Error } from "@/types/global";
import type {
  CreateListBody,
  AddItemBody,
} from "@/types/outstandingMoney/types";
import type {
  ApiOutStandingMoneyCreateList,
  ApiAddItem,
} from "@/types/api/outstandingMoney/types";

export async function outStandingMoneyCreateList(
  body: CreateListBody,
): Promise<ResponseData> {
  const urlPath = "/outstanding_money/create_list";
  const response = await apiPost(urlPath, body, "POST", 0, {
    Authorization: true,
    UserData: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return create list!");
    return {
      isValid: false,
      data: response.data as Error,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: response.data as ApiOutStandingMoneyCreateList,
    additional: response.additional,
  };
}

export async function outStandingMoneyAddItem(
  body: AddItemBody,
): Promise<ResponseData> {
  const urlPath = "/outstanding_money/add_item";
  const response = await apiPost(urlPath, body, "POST", 0, {
    Authorization: true,
    UserData: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return create list!");
    return {
      isValid: false,
      data: response.data as Error,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: response.data as ApiAddItem,
    additional: response.additional,
  };
}

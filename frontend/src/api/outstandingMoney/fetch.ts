import { apiGet } from "@/api/common/fetch";
import type { ResponseData, Error } from "@/types/global";
import type { ApiOutStandingMoneyCollection } from "@/types/api/outstandingMoney/types";

export async function outStandingMoneyCollection(): Promise<ResponseData> {
  const urlPath = `/outstanding_money/collection`;
  const response = await apiGet(urlPath, 0, {
    Authorization: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error(
      "API response does not return the outstanding_money collection!",
    );
    return {
      isValid: false,
      data: response.data as Error,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: response.data as ApiOutStandingMoneyCollection,
    additional: response.additional,
  };
}

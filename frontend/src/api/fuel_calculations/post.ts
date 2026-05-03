import { apiPost } from "@/api/common/post";
import type { ResponseData, Error } from "@/types/global";
import type { ApiFuelCalculation } from "@/types/api/fuelCalculation/types";
import type { fuelCalculationBody } from "@/types/fuelCalculation/types";

export async function fuelCalculations(
  body: fuelCalculationBody,
): Promise<ResponseData> {
  const urlPath = "/fuel/fuel_calculations";
  const response = await apiPost(urlPath, body, "POST", 0, {
    Authorization: true,
    UserData: true,
  });

  if (
    !response ||
    response.status !== "SUCCESS" ||
    response.status_code >= 400
  ) {
    console.error("API response does not return the fuel calculations!");
    return {
      isValid: false,
      data: response.data as Error,
      additional: response.additional,
    };
  }

  return {
    isValid: true,
    data: response.data as ApiFuelCalculation,
    additional: response.additional,
  };
}

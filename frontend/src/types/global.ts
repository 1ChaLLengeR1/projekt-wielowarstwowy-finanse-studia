import type { ApiCalculatorKeys } from "@/types/api/patryk/calculatorWork/types";
import type { ApiCalculations } from "@/types/api/patryk/calculatorWork/types";
import type { ApiAuth } from "@/types/api/auth/types";
import type { ApiCollectionLogs, Log } from "@/types/api/logs/types";
import type {
  ApiOutStandingMoneyCollection,
  ApiOutStandingMoneyCreateList,
  ApiAddItem,
  ApiEditItem,
  ApiEditNameList,
  ApiDeleteList,
  ApiDeleteItem,
} from "@/types/api/outstandingMoney/types";

import type { ApiFuelCalculation } from "@/types/api/fuelCalculation/types";

import type { ApiCollectionCalendaryCondition } from "@/types/api/calendar/condition/types";
import type {
  ApiCalendaryStatistics,
  ApiCollectionCalendary,
} from "@/types/api/calendar/types";

import type {
  CollectionTasks,
  OneTask,
  StatisticsTask,
} from "@/types/api/tasks/types";

export type Error = { message: string };

export interface ResponseData {
  isValid: boolean;
  data: ResponseApiData | string;
  additional: ResponseApiAdditional | null;
}

export interface ResponseApi {
  status: string;
  status_code: number;
  data: ResponseApiData | string;
  additional: ResponseApiAdditional;
}

export type ResponseApiData =
  | ApiAuth
  | ApiCalculatorKeys
  | ApiCalculations
  | ApiOutStandingMoneyCollection
  | ApiOutStandingMoneyCreateList
  | ApiAddItem
  | ApiEditNameList
  | ApiDeleteList
  | ApiDeleteItem
  | ApiEditItem
  | ApiFuelCalculation
  | ApiCollectionLogs
  | Log
  | CollectionTasks
  | OneTask
  | StatisticsTask
  | ApiCollectionCalendaryCondition
  | ApiCalendaryStatistics
  | ApiCollectionCalendary
  | Error;
export type ResponseApiAdditional = {};

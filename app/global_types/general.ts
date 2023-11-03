import { meal_type } from "@prisma/client";
import { measure } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
export type userSettings = {
  portion: number;
  notionSecret: string | null;
  selectedMealType: meal_type | null;
  username: string;
  measure: measure | null;
  allMealTypes?: meal_type[];
  allMeasures?: measure[];
};

export type usernameSettingImport = {
  username: string | null;
  setUsername: Dispatch<SetStateAction<string | null>>;
};

export type notionSecretSettingImport = {
  notionSecret: string | null;
  setNotionSecret: Dispatch<SetStateAction<string | null>>;
};

export type portionSettingImport = {
  portion: number;
  setPortion: Dispatch<SetStateAction<number>>;
};

export type measureSettingImport = {
  measure: measure | null | undefined;
  setMeasure: Dispatch<SetStateAction<measure | null | undefined>>;
  allMeasure: measure[] | null | undefined;
};

export type mealTypeSettingImport = {
  mealtype: meal_type | null | undefined;
  setMealType: Dispatch<SetStateAction<meal_type | null | undefined>>;
  allMealTypes: meal_type[] | null | undefined;
};

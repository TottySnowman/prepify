import { measure, users } from "@prisma/client";

export type meal_ingredient = {
  id: number;
  name: string;
  measure: {
    amount: number;
    unitLong: string;
    unitshort?: string;
  };
};

export type spoon_meal_ingredient = meal_ingredient & {
  aisle: string;
  consistency: string;
  original: string;
  nameClean: string;
  amount: number;
  meta: string;
  measures: {
    [key: string]: {
      amount: number;
      unitLong: string;
      unitshort: string;
    };
  };
};

export type meal_needings = {
  id: number;
  name: string;
  image: string;
  localizedName?: string;
};
export type meal_step_length = {
  number: number;
  unit: string;
};
export type meal_step = {
  number: number;
  step: string;
  ingredients: meal_needings[];
  equipment: meal_needings[];
  length?: meal_step_length;
};

export type step_by_step_guide_response = {
  title: string;
  ready_in_minutes: number;
  display_image: string;
  ingredient_list: meal_ingredient[];
  step: meal_step[];
};

export type user_with_measure = users & {
  measure: measure | null;
};

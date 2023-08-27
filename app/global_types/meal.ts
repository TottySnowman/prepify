export type meal_ingredient = {
  id: number;
  name: string;
  measure: {
    amount: number;
    unitLong: string;
    unitshort: string;
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

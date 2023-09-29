import {
  meal_ingredient,
  spoon_meal_ingredient,
} from "@/app/global_types/meal";

export function getIngredientList(
  spoon_meal_ingredient: spoon_meal_ingredient[],
  user_measure: string,
  recipe_servings: number,
  user_servings: number
): meal_ingredient[] {
  let ingredient_list: meal_ingredient[] = [];
  spoon_meal_ingredient.forEach((ingredient: spoon_meal_ingredient) => {
    let parsed_ingredient: meal_ingredient = {
      id: ingredient.id,
      name: ingredient.name,
      measure: {
        amount: 0,
        unitLong: "",
        unitshort: "",
      },
    };

    if (user_measure in ingredient.measures) {
      let selected_measure = ingredient.measures[user_measure];
      parsed_ingredient.measure = {
        amount: ((selected_measure.amount / recipe_servings) *
          user_servings) as number,
        unitshort: selected_measure.unitshort,
        unitLong: selected_measure.unitLong,
      };
    } else {
      //take metric as standard
      const selected_measure = ingredient.measures["metric"];
      parsed_ingredient.measure = {
        amount: ((selected_measure.amount / recipe_servings) *
          user_servings) as number,
        unitshort: selected_measure.unitshort,
        unitLong: selected_measure.unitLong,
      };
    }
    ingredient_list.push(parsed_ingredient);
  });

  return ingredient_list;
}

import { prismaClient } from "../db_client";
import getCurrentWeekNumber from "../global_functions/current_calendar_week";
import { update_ingredientlist } from "@/app/api/notion/update_ingredientlist";
import { getIngredientList } from "../global_functions/get_ingredients";
import { meal_ingredient, user_with_measure } from "@/app/global_types/meal";

type Weekly_Recipe = {
  week: number;
  year: number;
  id_recipe: number;
  recipe_name: string;
  id_user: number;
};

export default async function create_meal(
  all_user: user_with_measure[],
  week?: number,
  year?: number
) {
  const all_user_id: number[] = all_user.map((user) => user.ID);

  const allergies = await prismaClient.user_Allergies.findMany({
    where: {
      id_user: {
        in: all_user_id,
      },
    },
    include: {
      Allergens: true,
    },
  });

  const diets = await prismaClient.user_Diet.findMany({
    where: {
      id_user: {
        in: all_user_id,
      },
    },
    include: {
      Diet: true,
    },
  });

  const userCuisine = await prismaClient.user_cuisine_type.findMany({
    where: {
      id_user: {
        in: all_user_id,
      },
    },
    include: { Cuisine: true },
  });

  const apiKey = process.env.SPOONACULAR_API_KEY;
  const apiEndpoint = "https://api.spoonacular.com/recipes/complexSearch";

  let all_user_recipes: Weekly_Recipe[] = [];

  for (const user of all_user) {
    const user_allergies = allergies.filter(
      (allergy) => allergy.id_user === user.ID
    );

    const user_diets = diets.filter((diet) => diet.id_user === user.ID);
    const userCuisineExcludes = userCuisine.filter(
      (cuisine) => cuisine.id_user === user.ID
    );

    let intolerances: string = "";
    let dietInclude: string = "";
    let cuisineExclude: string = "";
    let Weekly_Recipe: Weekly_Recipe;

    user_allergies.forEach((allergy) => {
      intolerances += "&intolerances=" + allergy.Allergens?.allergy;
    });

    user_diets.forEach((diet) => {
      dietInclude += "&diet=" + diet.Diet?.diet;
    });

    userCuisineExcludes.forEach((cuisine) => {
      cuisineExclude += "&excludeCuisine=" + cuisine.Cuisine?.cuisine_type;
    });

    let full_api_url = `${apiEndpoint}?apiKey=${apiKey}&sort=random&sort=healthiness${intolerances}${dietInclude}${cuisineExclude}&type=${user.meal_type?.name}&number=1&instructionsRequired=true&addRecipeInformation=true&type=main%20course`;
    const response = await fetch(full_api_url, { cache: "no-store" });

    if (!response.ok) {
      console.log("Error fetching recipe!");
      console.log(full_api_url);
      break;
    }

    let responseData = await response.json();
    Weekly_Recipe = {
      week: week || getCurrentWeekNumber(),
      year: year || new Date().getFullYear(),
      id_recipe: responseData.results[0].id,
      recipe_name: responseData.results[0].title,
      id_user: user.ID,
    };
    all_user_recipes.push(Weekly_Recipe);

    if (!user.notion_api_key) break;

    const recipe_info = await fetch(
      `https://api.spoonacular.com/recipes/${responseData.results[0].id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    if (!recipe_info.ok) {
      console.log("Error fetching recipe info!");
      break;
    }

    const recipe_info_json = await recipe_info.json();
    const recipe_servings = recipe_info_json.servings;
    const recipe_ingredients = recipe_info_json.extendedIngredients;
    const user_measure = user.measure?.measure as string;
    let ingredient_list: meal_ingredient[] = getIngredientList(
      recipe_ingredients,
      user_measure,
      recipe_servings,
      user.servings
    );

    update_ingredientlist({
      notion_secret: user.notion_api_key,
      meal_title: responseData.results[0].title,
      ingredient_list: ingredient_list,
    });
  }

  const db_update = await prismaClient.weekly_Recipe.createMany({
    data: all_user_recipes,
  });

  return all_user_recipes;
}

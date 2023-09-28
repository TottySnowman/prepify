import { prismaClient } from "../db_client";
import getCurrentWeekNumber from "../global_functions/current_calendar_week";
import { update_ingredientlist } from "@/app/api/notion/update_ingredientlist";
import { users } from "@prisma/client";

type Weekly_Recipe = {
  week: number;
  year: number;
  id_recipe: number;
  recipe_name: string;
  id_user: number;
};
export default async function create_meal(
  all_user: users[],
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

  const apiKey = process.env.SPOONACULAR_API_KEY;
  const apiEndpoint = "https://api.spoonacular.com/recipes/complexSearch";

  let all_user_recipes: Weekly_Recipe[] = [];

  for (const user of all_user) {
    const user_allergies = allergies.filter(
      (allergy) => allergy.id_user === user.ID
    );
    const user_diets = diets.filter((diet) => diet.id_user === user.ID);
    let intolerancesString = "";
    let dietString = "";
    let Weekly_Recipe: Weekly_Recipe;

    user_allergies.forEach((allergy) => {
      intolerancesString += allergy.Allergens?.allergy + ",";
    });
    intolerancesString = intolerancesString.slice(0, -1);

    user_diets.forEach((diet) => {
      dietString += "&diet=" + diet.Diet;
    });

    let full_api_url = `${apiEndpoint}?apiKey=${apiKey}&sort=random&sort=healthiness&intolerances=${intolerancesString}${dietString}&number=1&instructionsRequired=true&addRecipeInformation=true`;
    const response = await fetch(full_api_url, { cache: "no-store" });

    if (!response.ok) {
      console.log("Error fetching recipe!");
      console.log(full_api_url);
      return;
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

    if (!user.notion_api_key) return;

    update_ingredientlist({
      notion_secret: user.notion_api_key,
      meal_title: responseData.results[0].title,
      //TODO Add ingredients, maybe need to call api again to get recipe information easier...
      ingredient_list: [],
    });
  }

  const db_update = await prismaClient.weekly_Recipe.createMany({
    data: all_user_recipes,
  });

  return all_user_recipes;
}

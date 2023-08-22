import prisma from "../db_client";
import getCurrentWeekNumber from "../global_functions/current_calendar_week";
type Weekly_Recipe = {
  week: number;
  year: number;
  id_recipe: number;
  recipe_name: string;
  id_user: number;
};
export default async function create_meal(
  all_user_id: number[],
  week?: number,
  year?: number
) {
  const allergies = await prisma.user_Allergies.findMany({
    where: {
      id_user: {
        in: all_user_id,
      },
    },
    include: {
      Allergens: true,
    },
  });
  const diets = await prisma.user_Diet.findMany({
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

  for (const userID of all_user_id) {
    const user_allergies = allergies.filter(
      (allergy) => allergy.id_user === userID
    );
    const user_diets = diets.filter((diet) => diet.id_user === userID);
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

    let full_api_url = `${apiEndpoint}?apiKey=${apiKey}&sort=random&sort=healthiness&intolerances=${intolerancesString}${dietString}&number=1`;
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
      id_user: userID,
    };
    all_user_recipes.push(Weekly_Recipe);
  }

  const db_update = await prisma.weekly_Recipe.createMany({
    data: all_user_recipes,
  });

  return all_user_recipes;
}

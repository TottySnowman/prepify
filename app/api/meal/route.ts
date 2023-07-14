import prisma from "../db_client";
import { NextRequest } from "next/server";
type Weekly_Recipe = {
  week: number;
  year: number;
  id_recipe: number;
  recipe_name: string;
  id_user: number;
};

export const POST = async (request: NextRequest) => {
  const { sentUserID } = await request.json();
  if (sentUserID.length <= 0) {
    return new Response("No Users given!", { status: 500 });
  }
  const allergies = await prisma.user_Allergies.findMany({
    where: {
      id_user: {
        in: sentUserID,
      },
    },
    include: {
      Allergens: true,
    },
  });
  const diets = await prisma.user_Diet.findMany({
    where: {
      id_user: {
        in: sentUserID,
      },
    },
    include: {
      Diet: true,
    },
  });

  const user_info = await prisma.users.findMany({
    where: {
      ID: {
        in: sentUserID,
      },
    },
  });
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const apiEndpoint = "https://api.spoonacular.com/recipes/complexSearch";
  const currentWeekNumber = getCurrentWeekNumber();
  const currentYear = new Date().getFullYear();

  let all_user_recipes: Weekly_Recipe[] = [];

  for (const user of user_info) {
    const user_allergies = allergies.filter(
      (allergy) => allergy.id_user === user.ID,
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

    let full_api_url = `${apiEndpoint}?apiKey=${apiKey}&sort=random&sort=healthiness&intolerances=${intolerancesString}&number=1${dietString}`;
    const response = await fetch(full_api_url);
    if (!response.ok) {
      return;
    }

    let responseData = await response.json();
    Weekly_Recipe = {
      week: currentWeekNumber,
      year: currentYear,
      id_recipe: responseData.results[0].id,
      recipe_name: responseData.results[0].title,
      id_user: user.ID,
    };
    all_user_recipes.push(Weekly_Recipe);
  }
  await prisma.weekly_Recipe.createMany({
    data: all_user_recipes,
  });
};

function getCurrentWeekNumber(): number {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const elapsedDays = Math.floor(
    (now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000),
  );
  const currentWeekNumber = Math.ceil((elapsedDays + 1) / 7);

  return currentWeekNumber;
}

import { NextRequest } from "next/server";
import { prismaClient } from "@/app/api/db_client";
import create_meal from "@/app/api/global_functions/create_meal";
import getCurrentWeekNumber from "@/app/api/global_functions/current_calendar_week";
import getIngredientList from "./get_ingredients";
import {
  meal_ingredient,
  meal_step,
  step_by_step_guide_response,
} from "@/app/global_types/meal";
type getMeal_props = {
  params: {
    id: string;
  };
};

export const GET = async (request: NextRequest, { params }: getMeal_props) => {
  let userID;
  try {
    userID = parseInt(params.id);
  } catch (error) {
    return new Response(JSON.stringify("Failed to login!"), { status: 403 });
  }

  let weekly_meal = await prismaClient.weekly_Recipe.findUnique({
    where: {
      week_year_id_user: {
        week: getCurrentWeekNumber(),
        year: new Date().getFullYear(),
        id_user: userID,
      },
    },
  });

  if (!weekly_meal) {
    const userArr: number[] = [userID];
    const created_meal = await create_meal(userArr);
    if (!created_meal) {
      return new Response(
        JSON.stringify("Failed to create a meal! Try again!"),
        {
          status: 404,
        }
      );
    }
    weekly_meal = created_meal[0];
  }

  const recipe_request = await fetch(
    `https://api.spoonacular.com/recipes/${weekly_meal.id_recipe}/information?apiKey=${process.env.SPOONACULAR_API_KEY}&stepBreakdown=true`
  );
  if (!recipe_request.ok) {
    return new Response(
      JSON.stringify("Failed to get the recipe! Try again!"),
      { status: 404 }
    );
  }

  const user_info = await prismaClient.users.findUnique({
    where: {
      ID: userID,
    },
    include: {
      measure: true,
    },
  });
  if (!user_info) {
    return;
  }

  const recipe_json = await recipe_request.json();
  const recipe_steps: meal_step[] = recipe_json.analyzedInstructions[0].steps;
  const recipe_servings = recipe_json.servings;
  const recipe_ingredients = recipe_json.extendedIngredients;
  const user_measure = user_info.measure?.measure as string;
  let ingredient_list: meal_ingredient[] = getIngredientList(
    recipe_ingredients,
    user_measure,
    recipe_servings,
    user_info.servings
  );

  const step_by_step_response: step_by_step_guide_response = {
    title: recipe_json.title,
    ready_in_minutes: recipe_json.readyInMinutes,
    display_image: recipe_json.image,
    ingredient_list: ingredient_list,
    step: recipe_steps,
  };
  return new Response(JSON.stringify(step_by_step_response), { status: 200 });
};

import { NextRequest } from "next/server";
import prisma from "@/app/api/db_client";
import create_meal from "@/app/api/global_functions/create_meal";
import getCurrentWeekNumber from "@/app/api/global_functions/current_calendar_week";
import getIngredientList from "./get_ingredients";
type getMeal_props = {
  params: {
    id: string;
  };
};
type meal_needings = {
  id: number;
  name: string;
  image: string;
};
type meal_step_length = {
  number: number;
  unit: string;
};
type meal_step = {
  number: number;
  step: string;
  ingredients: meal_needings[];
  equipment: meal_needings[];
  length: meal_step_length;
};
type meal_ingredient = {
  id: number;
  name: string;
  measure: {
    amount: number;
    unitLong: string;
    unitshort: string;
  };
};

type step_by_step_guide_response = {
  //Titel vom Gericht
  //Ready in minutes
  //Image
  //Zutaten ausgerechnet mit den Servings amount / given servings * user_servings
  //Name der Zutat, amount, ob gramm etc
  //Servings
  //Steps(meal_step)
  title: string;
  ready_in_minutes: number;
  display_image: string;
  ingredient_list: meal_ingredient[];
  step: meal_step[];
};
export const GET = async (request: NextRequest, { params }: getMeal_props) => {
  let userID;
  try {
    userID = parseInt(params.id);
  } catch (error) {
    return new Response(JSON.stringify("Failed to login!"), { status: 403 });
  }

  let weekly_meal = await prisma.weekly_Recipe.findUnique({
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

  const user_info = await prisma.users.findUnique({
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
  /* recipe_steps.forEach((step: meal_step) => {
    console.log("Step nummer:", step.number);

    step.ingredients.forEach((ingredient) => {
      console.log(ingredient.name);
      console.log(ingredient);
    });
  }); */
};

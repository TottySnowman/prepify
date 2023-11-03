import { prismaClient } from "../db_client";
import { NextRequest } from "next/server";
import jwt, { Secret } from "jsonwebtoken";
import { headers } from "next/headers";
import getCurrentWeekNumber from "../global_functions/current_calendar_week";
import create_meal from "@/app/api/global_functions/create_meal";
import { user_with_measure } from "@/app/global_types/meal";

export const GET = async (request: NextRequest) => {
  const headerList = headers();
  const sent_token = headerList.get("authorization_token");
  if (!sent_token) {
    return new Response("No Authorization-Token given!", { status: 401 });
  }

  try {
    jwt.verify(sent_token, process.env.AUTHORIZATION_KEY as Secret);
  } catch (e) {
    console.log(e);
    return new Response("Wrong key included!", { status: 401 });
  }

  const currentWeekNumber = getCurrentWeekNumber();
  const currentYear = new Date().getFullYear();
  const user_info = await prismaClient.users.findMany({
    include: {
      measure: true,
    },
  });
  const all_userIDs: number[] = user_info.map((user) => user.ID);

  const not_needed_users = await prismaClient.weekly_Recipe.findMany({
    where: {
      id_user: {
        in: all_userIDs,
      },
      AND: {
        week: currentWeekNumber,
        year: currentYear,
      },
    },
  });

  const not_needed_user_id = new Set(
    not_needed_users.map((user) => user.id_user)
  );
  const needed_users: number[] = all_userIDs.filter(
    (user) => !not_needed_user_id.has(user)
  );

  if (needed_users.length === 0) {
    return new Response(JSON.stringify("No Users are needed to update!"), {
      status: 200,
    });
  }
  let needed_full_users: user_with_measure[] = [];

  needed_users.forEach((userID) => {
    const user = user_info.find((user) => user.ID === userID);
    if (user) needed_full_users.push(user);
  });

  const all_user_recipes = await create_meal(
    needed_full_users,
    currentWeekNumber,
    currentYear
  );
  if (all_user_recipes?.length === needed_users.length) {
    return new Response(JSON.stringify("Created Meals for every user!"), {
      status: 200,
    });
  }

  return new Response(JSON.stringify("Some meals couldn't be created!"), {
    status: 406,
  });
};

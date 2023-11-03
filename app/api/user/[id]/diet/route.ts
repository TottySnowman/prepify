import { NextRequest } from "next/server";
import { prismaClient } from "../../../db_client";
import { Diet, User_Diet } from "@prisma/client";
type user_diet = {
  params: {
    id: string;
    selected_diets: string[];
  };
};

type updatedUserDiets = {
  params: {
    id: string;
    selected_diets: string[];
  };
};

type diet = {
  ID: number;
  diet: string;
};

export const GET = async (request: NextRequest, { params }: user_diet) => {
  let userID: number;
  try {
    userID = parseInt(params.id);
  } catch (error) {
    return new Response("Failed to login!", { status: 401 });
  }

  let all_diets = await prismaClient.diet.findMany();
  const userDiets = await prismaClient.user_Diet.findMany({
    where: {
      id_user: userID,
    },
    include: {
      Diet: true,
    },
  });

  const selectedDietsID = new Set(userDiets.map((diet) => diet.id_diet));
  const notSelectedDiets = all_diets.filter(
    (diet) => !selectedDietsID.has(diet.ID)
  );

  const response = {
    SelectedDiets: userDiets.map((diet) => diet.Diet),
    All_Diets: notSelectedDiets,
  };
  return new Response(JSON.stringify(response), { status: 200 });
};

export const POST = async (request: NextRequest, { params }: user_diet) => {
  let userID: number;
  try {
    userID = parseInt(params.id);
  } catch (error) {
    return new Response(JSON.stringify("Unauthorized"), { status: 401 });
  }

  const { selected_diets } = await request.json();

  const allDiets: Diet[] = await prismaClient.diet.findMany();
  const userDiets: User_Diet[] = await prismaClient.user_Diet.findMany({
    where: {
      id_user: userID,
    },
  });

  const oldSelectedDiets: number[] = userDiets.map((diet) => diet.id_diet);
  const newSelectedDiets: number[] = selected_diets.map(
    (diet: diet) => diet.ID
  );
  const allDietId: number[] = allDiets.map((diet) => diet.ID);
  const updatedDiets = selected_diets.filter(
    (item: number) =>
      !oldSelectedDiets.includes(item) && allDietId.includes(item)
  );

  const deletedDiets: number[] = oldSelectedDiets.filter(
    (item) => !newSelectedDiets.includes(item) && allDietId.includes(item)
  );

  let db_update_diet: User_Diet[] = [];

  updatedDiets.map((updatedDietID: number) => {
    db_update_diet.push({
      id_user: userID,
      id_diet: updatedDietID,
    });
  });

  try {
    await prismaClient.user_Diet.createMany({
      data: db_update_diet,
    });
    await prismaClient.user_Diet.deleteMany({
      where: {
        id_user: userID,
        id_diet: {
          in: deletedDiets,
        },
      },
    });
  } catch (error) {
    return new Response(JSON.stringify("Failed to update diets! Try again!"), {
      status: 500,
    });
  }

  return new Response(JSON.stringify("Successfully updated your diets!"), {
    status: 200,
  });
};

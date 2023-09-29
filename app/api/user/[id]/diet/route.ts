import { NextRequest } from "next/server";
import { prismaClient } from "../../../db_client";
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
  const id = params.id;
  let userID;
  try {
    userID = parseInt(id);
  } catch (error) {
    return new Response("Failed to login!", { status: 401 });
  }
  if (!id) {
    return new Response("Failed to login!", { status: 401 });
  }
  const all_diets = await prismaClient.diet.findMany();
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

export const POST = async (
  request: NextRequest,
  { params }: updatedUserDiets
) => {
  try {
    const userID: number = parseInt(params.id);
  } catch (error) {
    return new Response(JSON.stringify("Unauthorized"), { status: 401 });
  }

  const { selected_diets } = await request.json();

  const allDiets = await prismaClient.diets.findMany();
  const userDiets = await prismaClient.user_Diet.findMany({
    where: {
      id_user: userID,
    },
  });

  const oldSelectedDiets: number[] = userDiets.map((diet) => diet.ID);
  const newSelectedDiets: number[] = selected_diets.map(
    (diet: diet) => diet.ID
  );
};

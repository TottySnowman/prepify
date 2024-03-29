import { prismaClient } from "../../db_client";
import { Diet, User_Diet } from "@prisma/client";
import { verifyJwt } from "@/utils/jwtFunctions";

export const GET = async (request: Request) => {
  const accessToken = request.headers.get("Authorization");

  const payload = await verifyJwt(accessToken || "");

  if (!accessToken || !payload) {
    return new Response(JSON.stringify("Unauthorized"), { status: 401 });
  }

  const parsedUserID: number = payload.ID as number;

  let all_diets = await prismaClient.diet.findMany();
  const userDiets = await prismaClient.user_Diet.findMany({
    where: {
      id_user: parsedUserID,
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

export const POST = async (request: Request) => {
  const accessToken = request.headers.get("Authorization");

  const payload = await verifyJwt(accessToken || "");

  if (!accessToken || !payload) {
    return new Response(JSON.stringify("Unauthorized"), { status: 401 });
  }

  const parsedUserID: number = payload.ID as number;

  const { selected_diets } = await request.json();

  const allDiets: Diet[] = await prismaClient.diet.findMany();
  const userDiets: User_Diet[] = await prismaClient.user_Diet.findMany({
    where: {
      id_user: parsedUserID,
    },
  });

  const oldSelectedDiets: number[] = userDiets.map((diet) => diet.id_diet);
  const newSelectedDiets: number[] = selected_diets.map(
    (diet: Diet) => diet.ID
  );

  const allDietId: number[] = allDiets.map((diet) => diet.ID);
  const updatedDiets = newSelectedDiets.filter(
    (item: number) =>
      !oldSelectedDiets.includes(item) && allDietId.includes(item)
  );

  const deletedDiets: number[] = oldSelectedDiets.filter(
    (item) => !newSelectedDiets.includes(item) && allDietId.includes(item)
  );
  console.log(updatedDiets);
  let db_update_diet: User_Diet[] = [];

  updatedDiets.map((updatedDietID: number) => {
    db_update_diet.push({
      id_user: parsedUserID,
      id_diet: updatedDietID,
    });
  });

  try {
    await prismaClient.user_Diet.createMany({
      data: db_update_diet,
    });
    await prismaClient.user_Diet.deleteMany({
      where: {
        id_user: parsedUserID,
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

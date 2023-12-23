import { NextRequest } from "next/server";
import { prismaClient } from "../../db_client";
import { Cuisine, user_cuisine_type } from "@prisma/client";
import { verifyJwt } from "@/utils/jwtFunctions";

type user_cuisine_get_response = {
  selectedCuisine: (Cuisine | null)[];
  AllCuisine: Cuisine[];
};

export const GET = async (request: NextRequest) => {
  const accessToken = request.headers.get("Authorization");

  const payload = await verifyJwt(accessToken || "");

  if (!accessToken || !payload) {
    return new Response(JSON.stringify("Unauthorized"), { status: 401 });
  }

  const parsedUserID: number = payload.ID as number;

  let allCuisine = await prismaClient.cuisine.findMany();

  const userCuisine = await prismaClient.user_cuisine_type.findMany({
    where: {
      id_user: parsedUserID,
    },
    include: {
      Cuisine: true,
    },
  });

  const selectedIDs = new Set(userCuisine.map((cuisine) => cuisine.id_cuisine));

  allCuisine = allCuisine.filter((cuisine) => !selectedIDs.has(cuisine.ID));

  const response: user_cuisine_get_response = {
    selectedCuisine: userCuisine.map((userCuisine) => userCuisine.Cuisine),
    AllCuisine: allCuisine,
  };

  return new Response(JSON.stringify(response), { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const accessToken = request.headers.get("Authorization");

  const payload = await verifyJwt(accessToken || "");

  if (!accessToken || !payload) {
    return new Response(JSON.stringify("Unauthorized"), { status: 401 });
  }

  const parsedUserID: number = payload.ID as number;

  const { excludedCuisine } = await request.json();
  const allCuisineTypes: Cuisine[] = await prismaClient.cuisine.findMany();

  const userCuisineTypes = await prismaClient.user_cuisine_type.findMany({
    where: {
      id_user: parsedUserID,
    },
    include: {
      Cuisine: true,
    },
  });

  const excludedCuisineID: number[] = excludedCuisine.map(
    (cuisine: Cuisine) => cuisine.ID
  );

  const userCuisineID: number[] = userCuisineTypes.map(
    (cuisine) => cuisine.id_cuisine
  );
  const allCuisineID: number[] = allCuisineTypes.map((cuisine) => cuisine.ID);

  const updatedCusine: Cuisine[] = excludedCuisine.filter(
    (cuisine: Cuisine) =>
      !userCuisineID.includes(cuisine.ID) && allCuisineID.includes(cuisine.ID)
  );

  const deletedCusine = userCuisineID.filter(
    (cuisineID) =>
      !excludedCuisineID.includes(cuisineID) && allCuisineID.includes(cuisineID)
  );

  let dbUpdatedCusine: user_cuisine_type[] = [];

  updatedCusine.map((cuisine) => {
    dbUpdatedCusine.push({
      id_user: parsedUserID,
      id_cuisine: cuisine.ID,
    });
  });

  try {
    await prismaClient.user_cuisine_type.createMany({
      data: dbUpdatedCusine,
    });
    await prismaClient.user_cuisine_type.deleteMany({
      where: {
        id_user: parsedUserID,
        id_cuisine: {
          in: deletedCusine,
        },
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify("Failed to update cuisine types! Try again!"),
      { status: 500 }
    );
  }

  return new Response(JSON.stringify("Sucessfully updated cuisine types!"), {
    status: 200,
  });
};

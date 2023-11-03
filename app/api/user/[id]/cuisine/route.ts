import { NextRequest } from "next/server";
import { prismaClient } from "../../../db_client";
import { Cuisine, user_cuisine_type } from "@prisma/client";

type cuisine_import = {
  params: {
    id: string;
  };
};
type cuisine_import_update = {
  params: {
    id: string;
    excludedCuisine: Cuisine[];
  };
};

type user_cuisine_get_response = {
  selectedCuisine: (Cuisine | null)[];
  AllCuisine: Cuisine[];
};

export const GET = async (request: NextRequest, { params }: cuisine_import) => {
  let userID: number;
  try {
    userID = parseInt(params.id);
  } catch (error) {
    return new Response("Failed to login!", { status: 401 });
  }

  let allCuisine = await prismaClient.cuisine.findMany();

  const userCuisine = await prismaClient.user_cuisine_type.findMany({
    where: {
      id_user: userID,
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
};

export const POST = async (
  request: NextRequest,
  { params }: cuisine_import_update
) => {
  let userID: number;
  try {
    userID = parseInt(params.id);
  } catch (error) {
    return new Response(JSON.stringify("Unauthorized!"), { status: 401 });
  }

  const { excludedCuisine } = await request.json();
  const allCuisineTypes: Cuisine[] = await prismaClient.cuisine.findMany();

  const userCuisineTypes = await prismaClient.user_cuisine_type.findMany({
    where: {
      id_user: userID,
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
      id_user: userID,
      id_cuisine: cuisine.ID,
    });
  });

  try {
    await prismaClient.user_cuisine_type.createMany({
      data: dbUpdatedCusine,
    });
    await prismaClient.user_cuisine_type.deleteMany({
      where: {
        id_user: userID,
        id_cuisine: {
          in: deletedCusine,
        },
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify("Failed to update cuisine types! Try again!"),
      { status: 502 }
    );
  }

  return new Response(JSON.stringify("Sucessfully updated cuisine types!"), {
    status: 200,
  });
};

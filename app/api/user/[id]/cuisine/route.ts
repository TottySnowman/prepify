import { NextRequest } from "next/server";
import { prismaClient } from "../../../db_client";
import { Cuisine } from "@prisma/client";

type cuisine_import = {
  params: {
    id: string;
  };
};

type user_cuisine_get_response = {
  selectedCuisine: Cusine[];
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

  const userCuisine = await prismaClient.user_cuisine.findMany({
    where: {
      id_user: userID,
    },
    include: {
      Cusine: true,
    },
  });

  const selectedIDs = new Set(userCuisine.map((cuisine) => cuisine.ID));

  allCuisine = allCuisine.filter((cuisine) => !selectedIDs.has(cuisine.ID));

  const response: user_cuisine_get_response = {
    selectedCuisine: userCuisine.map((userCuisine) => userCuisine.Cusine),
    AllCuisine: allCuisine,
  };

  export const POST = async () => {
    
  }
};

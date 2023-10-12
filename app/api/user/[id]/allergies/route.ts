import { NextRequest } from "next/server";
import { prismaClient } from "../../../db_client";
import { Allergens } from "@prisma/client";

type userAllergies = {
  params: {
    id: string;
  };
};

type updatedUserAllergies = {
  params: {
    id: string;
    selected_allergies: string[];
  };
};

type Typeallergy = {
  ID: number;
  allergy: string;
};
export const GET = async (request: NextRequest, { params }: userAllergies) => {
  let parsedUserID: number;
  try {
    parsedUserID = parseInt(params.id);
  } catch (error) {
    return new Response("Unauthorized", { status: 401 });
  }

  let all_allergies = await prismaClient.allergens.findMany();
  const userAllergies = await prismaClient.user_Allergies.findMany({
    where: {
      id_user: parsedUserID,
    },
    include: {
      Allergens: true,
    },
  });
  const idsToRemove = new Set(
    userAllergies.map((allergy) => allergy.id_allergy)
  );
  all_allergies = all_allergies.filter(
    (allergy) => !idsToRemove.has(allergy.ID)
  );
  const response = {
    SelectedAllergies: userAllergies.map(
      (userAllergy) => userAllergy.Allergens
    ),
    Allergies: all_allergies,
  };
  return new Response(JSON.stringify(response), { status: 200 });
};

export const POST = async (
  request: NextRequest,
  { params }: updatedUserAllergies
) => {
  let user_id: number;
  try {
    user_id = parseInt(params.id);
  } catch (error) {
    return new Response(JSON.stringify("Failed to login!"), { status: 401 });
  }
  const { selected_allergies } = await request.json();
  const all_allergies = await prismaClient.allergens.findMany();

  const userAllergies = await prismaClient.user_Allergies.findMany({
    where: {
      id_user: user_id,
    },
  });
  const idsJson1: number[] = selected_allergies.map(
    (item: Allergens) => item.ID
  );
  const idsJson2: number[] = userAllergies.map((item) => item.id_allergy);
  const all_allergies_id: number[] = all_allergies.map((allergy) => allergy.ID);
  const updated_allergies = selected_allergies.filter(
    (item: Allergens) =>
      !idsJson2.includes(item.ID) && all_allergies_id.includes(item.ID)
  );
  const deleted_allergies = userAllergies.filter(
    (item) =>
      !idsJson1.includes(item.id_allergy) &&
      all_allergies_id.includes(item.id_allergy)
  );
  let db_updated_allergies = [];
  for (let x = 0; x < updated_allergies.length; x++) {
    db_updated_allergies.push({
      id_user: user_id,
      id_allergy: updated_allergies[x].ID,
    });
  }

  try {
    await prismaClient.user_Allergies.createMany({
      data: db_updated_allergies,
    });
    deleted_allergies.forEach(async (allergy) => {
      await prismaClient.user_Allergies.deleteMany({
        where: {
          id_user: user_id,
          id_allergy: allergy.id_allergy,
        },
      });
    });
  } catch (error) {
    return new Response(
      JSON.stringify("Failed to update allergies! Try again!"),
      {
        status: 502,
      }
    );
  }
  return new Response(JSON.stringify("Successfully updated your allergies!"), {
    status: 200,
  });
};

import { prismaClient } from "@/app/api/db_client";
import { NextRequest } from "next/server";
import { userSettings } from "@/app/global_types/general";

type userSettingsImport = {
  params: {
    id: string;
  };
};

interface UpdateData {
  username: string;
  servings: number;
  id_meal_type?: number;
  id_measure?: number;
  notion_api_key?: string;
}

export const GET = async (
  request: NextRequest,
  { params }: userSettingsImport
) => {
  let userID: number;
  try {
    userID = parseInt(params.id);
  } catch (error) {
    return new Response(JSON.stringify("Unauthorized!"), { status: 401 });
  }

  const userInfo = await getUserInfo(userID);

  if (!userInfo) {
    return new Response(JSON.stringify("Unauthorized!"), { status: 401 });
  }

  const allMealTypes = await prismaClient.meal_type.findMany();
  const allMeasures = await prismaClient.measure.findMany();

  const notion_api_key: string = userInfo.notion_api_key as string;
  var maskedPart = "*".repeat(notion_api_key.length - 10);
  var maskedKey =
    notion_api_key.substring(0, 10) +
    maskedPart +
    notion_api_key.substring(notion_api_key.length - 3);

  const response: userSettings = {
    portion: userInfo.servings,
    notionSecret: maskedKey,
    selectedMealType: {
      ID: userInfo.meal_type?.ID as number,
      name: userInfo.meal_type?.name as string,
    },
    username: userInfo.username,
    measure: userInfo.measure,
    allMealTypes: allMealTypes,
    allMeasures: allMeasures,
  };
  return new Response(JSON.stringify(response), { status: 200 });
};

export const POST = async (
  request: NextRequest,
  { params }: userSettingsImport
) => {
  let userID: number;
  try {
    userID = parseInt(params.id);
  } catch (error) {
    return new Response(JSON.stringify("Unauthorized!"), { status: 401 });
  }
  const updatedSettings: userSettings = await request.json();
  let updateData: UpdateData = {
    username: updatedSettings.username,
    servings: updatedSettings.portion,
    id_meal_type: updatedSettings.selectedMealType?.ID,
    id_measure: updatedSettings.measure?.ID,
  };

  if (!updatedSettings.notionSecret?.includes("*")) {
    updateData.notion_api_key = updatedSettings.notionSecret as string;
  }

  try {
    await prismaClient.users.update({
      where: {
        ID: userID,
      },
      data: updateData,
    });
  } catch (error) {
    return new Response(
      JSON.stringify("Failed to update settings! Try again!"),

      { status: 500 }
    );
  }
  return new Response(JSON.stringify("Successfully updated settings!"), {
    status: 200,
  });
};

export const DELETE = async (
  request: NextRequest,
  { params }: userSettingsImport
) => {
  let userID: number;
  try {
    userID = parseInt(params.id);
  } catch (error) {
    return new Response(JSON.stringify("Unauthorized!"), { status: 401 });
  }

  try {
    await prismaClient.users.update({
      where: {
        ID: userID,
      },
      data: {
        deleted: true,
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify("Failed to delete account! Try again!"),
      { status: 500 }
    );
  }
  return new Response(
    JSON.stringify("Successfully deleted! Sad to see you go!"),
    { status: 200 }
  );
};

const getUserInfo = async (userID: number) => {
  const userInfo = await prismaClient.users.findUnique({
    where: {
      ID: userID,
    },
    include: {
      meal_type: true,
      measure: true,
    },
  });

  return userInfo;
};

import { prismaClient } from "@/app/api/db_client";
import { NextRequest } from "next/server";
import { userSettings } from "@/app/global_types/general";
import { verifyJwt } from "@/utils/jwtFunctions";

interface UpdateData {
  username: string;
  servings: number;
  id_meal_type?: number;
  id_measure?: number;
  notion_api_key?: string;
}

export const GET = async (req: Request) => {
  const accessToken = req.headers.get("Authorization");

  const payload = await verifyJwt(accessToken || "");

  if (!accessToken || !payload) {
    return new Response(JSON.stringify("Unauthorized"), { status: 401 });
  }

  const parsedUserID: number = payload.ID as number;

  const userInfo = await getUserInfo(parsedUserID);

  if (!userInfo) {
    return new Response(JSON.stringify("Unauthorized!"), { status: 401 });
  }

  const allMealTypes = await prismaClient.meal_type.findMany();
  const allMeasures = await prismaClient.measure.findMany();
  let maskedKey = "";
  if (userInfo.notion_api_key) {
    const notion_api_key: string = userInfo.notion_api_key;
    const maskedPart = "*".repeat(notion_api_key.length - 10);
    maskedKey =
      notion_api_key.substring(0, 10) +
      maskedPart +
      notion_api_key.substring(notion_api_key.length - 3);
  }

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

export const POST = async (request: NextRequest) => {
  const accessToken = request.headers.get("Authorization");

  const payload = await verifyJwt(accessToken || "");

  if (!accessToken || !payload) {
    return new Response(JSON.stringify("Unauthorized"), { status: 401 });
  }

  const parsedUserID: number = payload.ID as number;
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
        ID: parsedUserID,
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

export const DELETE = async (request: NextRequest) => {
  const accessToken = request.headers.get("Authorization");

  const payload = await verifyJwt(accessToken || "");

  if (!accessToken || !payload) {
    return new Response(JSON.stringify("Unauthorized"), { status: 401 });
  }

  const parsedUserID: number = payload.ID as number;

  const random = (Math.random() + 1).toString(36).substring(2);

  try {
    await prismaClient.users.update({
      where: {
        ID: parsedUserID,
      },
      data: {
        email: random,
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

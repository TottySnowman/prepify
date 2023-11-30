import { NextRequest } from "next/server";
import { prismaClient } from "@/app/api/db_client";

export const GET = async (request: NextRequest) => {
  try {
    const userCount = await prismaClient.users.count({
      where: {
        deleted: false,
      },
    });
    return new Response(
      JSON.stringify({
        userCount: userCount,
      }),
      { status: 200 }
    );
  } catch (e) {
    return (
      new Response(
        JSON.stringify({
          message: "Failed to get User count!",
        })
      ),
      { status: 500 }
    );
  }
};

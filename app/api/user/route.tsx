import { NextApiRequest } from "next";
import { prismaClient } from "../db_client";
export const GET = async (request: NextApiRequest) => {
  try {
    const users = await prismaClient.users.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts!", { status: 500 });
  }
};

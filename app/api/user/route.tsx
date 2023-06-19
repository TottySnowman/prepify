import { NextApiRequest } from "next";
import prisma from "../db_client";
export const GET = async (request: NextApiRequest) => {
  try {
    const users = await prisma.users.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts!", { status: 500 });
  }
};

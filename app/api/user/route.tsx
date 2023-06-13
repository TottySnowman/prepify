import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
export const GET = async (request: NextApiRequest) => {
  try {
    const prisma = new PrismaClient();
    const users = await prisma.users.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts!", { status: 500 });
  }
};

import { NextRequest } from "next/server";
type getMeal_props = {
  params: {
    id: string;
  };
};
export const GET = async (request: NextRequest, { params }: getMeal_props) => {
  console.log(params.id);
  let userID;
  try {
    userID = parseInt(params.id);
    console.log(userID);
  } catch (error) {
    return new Response("Failed to login!", { status: 502 });
  }
};

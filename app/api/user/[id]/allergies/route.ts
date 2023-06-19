import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../db_client"
type userAllergies = {
  params:{
id: string
  }
  
}
export const GET = async (request: NextRequest, {params} : userAllergies) => {
  const id = params.id;
  let all_allergies = await prisma.allergens.findMany();
  if(!id){
    return new Response("Failed to login!", {status:502});
  }

  try{
      const parsedUserID = parseInt(id);
      const userAllergies = await prisma.user_Allergies.findMany({
      where: {
        id_user: parsedUserID,
      },
      include: {
        Allergens: true,
      },
    });
    const idsToRemove = new Set(userAllergies.map(allergy => allergy.id_allergy));
    all_allergies = all_allergies.filter(allergy => !idsToRemove.has(allergy.ID));
    
    const response = {
      "SelectedAllergies": userAllergies,
      "Allergies": all_allergies
    }
    return new Response(JSON.stringify(response), { status: 200 });
    }catch(error){
    return new Response("Failed to load user allergies!", {status:501});
  }
};

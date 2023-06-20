import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../db_client"
type userAllergies = {
  params:{
id: string
  }
  
}

type updatedUserAllergies = {
  params:{
    id: string,
    selected_allergies: string[]
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
      "SelectedAllergies": userAllergies.map(userAllergy => userAllergy.Allergens),
      "Allergies": all_allergies
    }
    return new Response(JSON.stringify(response), { status: 200 });
    }catch(error){
    return new Response("Failed to load user allergies!", {status:501});
  }
};

export const PATCH = async (request: NextRequest, {params} : updatedUserAllergies) =>{
  //Upsert machen von allen IDs
  try{
    const user_id = parseInt(params.id);
  }catch(error){
    return new Response("Failed to login!", {status: 502});
  }

  

   const selected_allergies = params.selected_allergies;
  let all_allergies = await prisma.allergens.findMany();
   selected_allergies.forEach(allergy_id =>{
    //Check if the allergy is valid

    await prisma.user_Allergies.upsert({
      where:{
        id_user: user_id
      },
      create:{
        id_user: user_id,
        id_allery: allergy_id
      },
      update:{}
    })
   })
}
import prisma from "../db_client"
import { NextRequest } from "next/server";
type setMeals = {
    sentUserID: number[]
}
export const POST = async(request: NextRequest) =>{
    const {sentUserID} = await request.json();
    if(sentUserID.length <= 0){
        return new Response("No Users given!", {status: 500})
    }
    const allergies = await prisma.user_Allergies.findMany({
        where:{
            id_user:{
                in: sentUserID
            }
        }
    })

    console.log("All Allergies",allergies);
    const diets = await prisma.user_Diet.findMany({
        where:{
            id_user:{
                in: sentUserID
            }
        }
    })

    const user_info = await prisma.users.findMany({
        where:{
            ID:{
                in: sentUserID
            }
        }
    })
    console.log("UserInfo:", user_info);
    user_info.forEach(user=>{
        const user_allergies = allergies.filter(allergy => allergy.id_user === user.ID);
        console.log("current user allergies: ", user_allergies);

    })
}
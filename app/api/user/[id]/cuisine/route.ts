import { NextRequest } from "next/server";
import prisma from "../../../db_client"
type cuisine = {
params:{
    id:string
}
}
export const GET = async(request:NextRequest, {params} : cuisine) =>{
    const userID = params.id;
    if(!userID){
    return new Response("Failed to login!", {status:502});
    }
    let all_cuisine = await prisma.cuisine.findMany();
    
}
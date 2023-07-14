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
        },
        include: {
        Allergens: true,
      },
    })

    console.log("All Allergies",allergies);
    const diets = await prisma.user_Diet.findMany({
        where:{
            id_user:{
                in: sentUserID
            }
        },
        include:{
            Diet: true
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
    const apiKey = process.env.SpoonacularAPIKey;
    const apiEndpoint = "https://api.spoonacular.com/recipes/complexSearch";
    
    user_info.forEach(user=>{
        const user_allergies = allergies.filter(allergy => allergy.id_user === user.ID);
        const user_diets = diets.filter(diet => diet.id_user === user.ID);
        let intolerancesString = "";
        let dietString = "";

        user_allergies.forEach(allergey => {
            intolerancesString += allergey.Allergey + ","
        });
        user_diets.forEach(diet => {
            dietString += "&diet=" + diet.Diet
        });
        //Fetch Receipe from spoonacular API
        console.log("current user allergies: ", intolerancesString);
        let full_api_url = `${apiEndpoint}?apiKey=${apiKey}&sort=random&intolerances=${intolerancesString}&number=1${dietString}`;
        const response = await fetch(full_api_url);
    })

    //Insert into DB with prisma.createMany()
}
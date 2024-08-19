import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";



export const GET = async (request)=>{
    try{
        await connectToDB();
        const prompts = await Prompt.find({}).populate
        ('creator');

        return new Response(JSON.stringify(prompts),{
            status:200
        })


    }catch (e) {
         return new Response("Failed ti fetch all Prompts", {status: 500})

    }
}
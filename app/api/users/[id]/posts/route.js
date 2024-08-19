import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();


        const prompts = await Prompt.find({
            creator: params.id,  // Corrected property access for filtering by creator
        }).populate('creator');  // Corrected method call for populating creator

        return new Response(JSON.stringify(prompts), {
            status: 200,
        });
    } catch (e) {
        console.error(e);  // Added error logging for debugging
        return new Response("Failed to fetch all prompts", { status: 500 });  // Fixed typo in error message
    }
};

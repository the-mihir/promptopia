import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const POST = async (req, res) => {
    const { userId, prompt, tag } = await req.json(); // Consistent variable names

    try {
        await connectToDB();

        const newPrompt = new Prompt({ // Correctly using the Prompt model
            creator: userId, // Consistent with the frontend
            prompt, // Correct variable name for prompt text
            tag,
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {
            status: 201,
        });

    } catch (e) {
        return new Response("Failed to create a new prompt", {
            status: 500,
        });
    }
};

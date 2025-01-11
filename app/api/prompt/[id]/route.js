import Prompt from "@models/prompt";
import { connectDB } from "@utils/database";

// CORS Headers
const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // Or specify a domain like 'http://localhost:8081'
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// OPTIONS Request for Preflight CORS Request Handling
export const OPTIONS = async () => {
    return new Response(null, {
        status: 204,
        headers: corsHeaders,
    });
};

// GET Request
export const GET = async (request, { params }) => {
    try {
        await connectDB();

        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) {
            return new Response("Prompt doesn't exist!", { status: 404, headers: corsHeaders });
        }

        return new Response(JSON.stringify(prompt), { status: 200, headers: corsHeaders });
    } catch (error) {
        return new Response("Failed to fetch the prompt", { status: 500, headers: corsHeaders });
    }
};

// PATCH Request
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectDB();
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt doesn't exist!", { status: 404, headers: corsHeaders });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200, headers: corsHeaders });
    } catch (error) {
        return new Response("Failed to update", { status: 500, headers: corsHeaders });
    }
};

// DELETE Request
export const DELETE = async (request, { params }) => {
    try {
        await connectDB();
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Successfully Deleted!", { status: 200, headers: corsHeaders });
    } catch (error) {
        return new Response("Failed to delete!", { status: 500, headers: corsHeaders });
    }
};

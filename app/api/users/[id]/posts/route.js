import Prompt from "@models/prompt";
import { connectDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const prompts = await Prompt.find({ creator: params.id }).populate("creator");

    // Add CORS headers to the response
    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:8081", // Replace with your frontend's origin
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:8081",
      },
    });
  }
};

// Add an OPTIONS method for CORS pre-flight requests
export const OPTIONS = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:8081", // Replace with your frontend's origin
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
};

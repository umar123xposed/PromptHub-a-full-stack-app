import Prompt from "@models/prompt";
import { connectDB } from "@utils/database";

export const POST = async (request) => {
  const { userId, prompt, tag } = await request.json();

  try {
    await connectDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
      headers: {
        "Access-Control-Allow-Origin": "*", // Replace with your frontend's origin
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return new Response("Failed to create a new prompt", {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // Replace with your frontend's origin
      },
    });
  }
};

// Handle preflight requests
export const OPTIONS = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*", // Replace with your frontend's origin
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
};

import User from '@models/user';
import { connectDB } from '@utils/database';

export const GET = async (request) => {
  const url = new URL(request.url);
  const email = url.searchParams.get('email');

  if (!email) {
    return new Response("Email parameter is required", {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*", // Frontend origin
      },
    });
  }

  try {
    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return new Response("User not found", {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    return new Response(JSON.stringify({ id: user._id }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Internal Server Error", {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};

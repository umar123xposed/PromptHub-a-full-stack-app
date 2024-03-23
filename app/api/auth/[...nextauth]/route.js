import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import {connectDB} from "@utils/database"
import User from "@models/user";


const Handler=NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    async session({session}){

        const userSession= await User.findOne({
            email: session.user.email,

        })
        session.user.id= userSession._id.toString();
        return session
    },

    async signIn({profile}){

        try{
            await connectDB();

            //check for the user
            const userExist= await User.findOne({
                email:profile.email
            })

            //if not exist, create one
            if(!userExist){
                await User.create({
                    email:profile.email,
                    username:profile.name.replace(" ", "").toLowerCase(),
                    image: profile.pciture
                })

            }
            return true;

        }
        catch(error){
            console.log(error)
            return false;

        }



    }
})

export {Handler as GET, Handler as POST}
import Prompt from "@models/prompt";
import { connectDB } from "@utils/database";
//GET
export const GET = async (request, {params}) => {
    try {
        await connectDB()

        const prompt = await Prompt.findById(params.id).populate('creator')
        if(!prompt){
            return new Response("prompt doesnt exist!", { status: 404 })
        }

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 

//PATCH
export const PATCH=async (request, {params})=>{

    const {prompt, tag}=await request.json();

    try {
        await connectDB()
        const existingPrompt= await Prompt.findById(params.id);

        if(!existingPrompt){
            return new Response( "prompt doesnt exist!",{status:404}   )
        }
        existingPrompt.prompt=prompt    
        existingPrompt.tag= tag
        await existingPrompt.save()
        return new Response( JSON.stringify(existingPrompt),{status:200}   )
    } catch (error) {
        return new Response("failed to update",{status: 500})
    }
}

//DELETE
export const DELETE=async(request,{params})=>{
    try {
        await connectDB()
        await Prompt.findByIdAndRemove(params.id)

        return new Response("Succesfully Deleted!", {status:200})
    } catch (error) {
        return new Response("failed to delete!", {status: 500})
        
    }
}
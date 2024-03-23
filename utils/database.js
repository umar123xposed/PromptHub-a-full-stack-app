
import mongoose from "mongoose";

let isConnected= false //track connection

export const connectDB= async()=>{
    mongoose.set('strictQuery',true)

    if(isConnected){
        console.log("DB is already connected")
        return;
    }
    else{
        try{

            await mongoose.connect(Process.env.MONGODB_URI,{
                dbName:'share_prompt',
                useNewUrlParser: true,
                useUnifiedTopology: true
            })

            console.log("DB is now connected")
            isConnected=true

        }
        catch(error){
            console.log(error)
            

        }
    }
}
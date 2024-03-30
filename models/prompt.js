import { Schema, model, models } from "mongoose";

const promptSchema= new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt:{
        type: String,
        required:[true, 'promt is required!']
    },
    tag:{
        type: String,
        required:[true, 'tag is required!']
    }
})

const Prompt= models.Prompt || model('prompt', promptSchema)

export default Prompt
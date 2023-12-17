import {mongoose,model} from "mongoose"
import {randomUUID} from 'node:crypto'

const messageCollection = "messages"

const messageSchema = new mongoose.Schema({
    _id:{type:String, default:randomUUID},
    user:{type:String,required:true},
    message:{type:String,required:true},
},{
    strict: 'throw',
    versionKey: false
})


export const manager = model(messageCollection,messageSchema)
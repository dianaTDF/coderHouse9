import {mongoose,model} from "mongoose"
import {randomUUID} from 'node:crypto'
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = "products"

const productSchema = new mongoose.Schema({
    _id:{type:String, default:randomUUID},
    title:{type:String,required:true, index:true},
    description:{type:String,required:true},
    code:{type:String,required:true},
    price:{type:Number,required:true},
    status:{type:String,required:true},
    stock:{type:Number,required:true},
    category:{type:String,required:true},
    thumbnails:{type:[String], default:[]},
},{
    strict: 'throw',
    versionKey: false
})

productSchema.plugin(mongoosePaginate)
export const manager = model(productCollection,productSchema)
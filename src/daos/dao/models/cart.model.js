import {mongoose,model} from "mongoose"
import {randomUUID} from 'node:crypto'

const cartCollection = "carts"

const cartSchema = new mongoose.Schema({
    _id:{type:String, default:randomUUID},
    products:[{String}],
})

export const manager = model(cartCollection,cartSchema)
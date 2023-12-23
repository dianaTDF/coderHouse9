import {mongoose,model} from "mongoose"
import {randomUUID} from 'node:crypto'

const cartCollection = "carts"

const cartSchema = new mongoose.Schema({
    _id:{type:String, default:randomUUID},
    products:{
        type:[{
                _id: false,
                product:{type:String,
                        ref:'products'},
                counter:{type:Number,min:1}
                }],
        default:[]
        },
}, {
    strict: 'throw',
    versionKey: false
})


cartSchema.pre(['find', 'findOne', 'findById'],function(next){
    this.populate('products.product')
    next()
})


/* cartSchema.statics.newMultiplecarts= async function  (prodArr){
    let result = []
    for (const prod of prodArr) {
        const newCart = new this(prod )
        await newCart.save()
        result.push(newCart)

    }
    return result
}
*/

/*
cartSchema.statics.loadProducts= async function  (products){
    this.products = products
    this.save() 
    let result = []
    for (const prod of prodArr) {
        const newCart = new this(prod )
        await newCart.save()
        result.push(newCart)

    } 
    //return result
}
*/


export const manager = model(cartCollection,cartSchema)
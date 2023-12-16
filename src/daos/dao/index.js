import mongoose from "mongoose"
import {MONGODB_CNX_STR} from '../../config.js'


try{
    await mongoose.connect(MONGODB_CNX_STR)
    console.log('conected to MongoDB')
} catch(error){
    console.log(`can not conect to mongoDB: ${error}`)
    process.exit()
}

export {manager as productDao} from './models/product.model.js'
export {manager as messageDao} from './models/message.model.js'
export {manager as cartDao} from './models/cart.model.js'
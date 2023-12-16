import Router from 'express'
import {router as messageRouter} from './message.router.js'
import {router as cartRouter} from './cart.router.js'
import {router as productRouter} from './product.router.js'

export const router = Router()

router.use('/messages',messageRouter)
router.use('/carts',cartRouter)
router.use('/products',productRouter)
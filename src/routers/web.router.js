import Router from 'express'
import {router as messageRouter} from './message.router.js'
import {router as cartRouter} from './cart.router.js'
import {router as productRouter} from './product.router.js'

export const router = Router()

router.use('/chat',(req,res)=>{
    res.render('chat.handlebars',{title:'Chat',css:true, cssRoute:`/statics/css/chat.css`})
})
router.use('/',(req,res)=>{
    res.render('product.handlebars',{title:'Productos'})
})
/* router.use('/cart',cartRouter)
router.use('/product',productRouter) */
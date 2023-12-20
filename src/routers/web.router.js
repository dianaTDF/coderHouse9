import Router from 'express'
/* import {router as messageRouter} from './message.router.js'
import {router as cartRouter} from './cart.router.js'
import {router as productRouter} from './product.router.js' */
import { productDao } from '../daos/dao/index.js'

export const router = Router()

router.use('/chat',(req,res)=>{
    res.render('chat.handlebars',{title:'Chat',css:true, cssRoute:`/statics/css/chat.css`})
})


router.use('/products/:pid', async (req,res)=>{
    const  {pid}= req.params
    try {
        const product = await productDao.findById(pid)
        res.render('products.show.handlebars',{title:'Ver roducto',producto:product})
    } catch (error) {
        res.status(404).send({result:'error'})
        console.log(`MongoDB: couldn't update product ${title} \n ERROR: ${error}`)
    }
    
})


router.use('/products', async (req,res)=>{

    const  {limit=10, page=1, sort, query} = req.query 

    let seachOptions={
        limit:limit,
        page:page,
        lean: true //estuve luchando 2 horas y solo me faltaba esta opcion :,D
    }

    if (sort){
        if (sort== 'desc'){            
            seachOptions.sort = {price: -1}
        }
        if (sort== 'adc'){
            seachOptions.sort = {price: 1}
        }        
    }

    const title = query? {title:query}:{}


    const result = await productDao.paginate(title, seachOptions)
    
    console.log(result)
    //res.json({title:'productos', ...result})
    res.render('products.new.handlebars',{title:'productos', ...result})
})

router.use('/',(req,res)=>{
    res.render('products.old.handlebars',{title:'Productos'})
})
/* router.use('/cart',cartRouter)
router.use('/product',productRouter) */


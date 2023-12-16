import Router from 'express'
import {productDao} from '../daos/dao/index.js'

export const router = Router()

router.get('/',async (req,res)=>{
    try{
        let products= await productDao.find()
        res.send({result:'succes',payload:products})
    }catch(error){
        console.log(`MongoDB: cannot get products \n ERROR: ${error}`)
    }
})


router.post('/',async (req,res)=>{
    let {title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails} = req.body

    for (const [key, value] of Object.entries(
        {title,
        description,
        code,
        price,
        status,
        stock,
        category}
    )){
        if(!value){
            return res.send({status:'error',error:`${key} es obligatorio`})
        }
    }

    try{
        let newProduct= await productDao.create({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        })

        res.send({result:'success',payload:newProduct})
    }catch(error){
        res.send({result:'error'})
        console.log(`MongoDB: couldn't create product ${title} \n ERROR: ${error}`)
    }
})

router.put('/:uid', async(req,res)=>{
    let {uid} = req.params
    
    let {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    } = req.body

    const newInfo= {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    }

    try {
        let result = await productDao.updateOne({_id:uid},newInfo)
        res.send({status:'success',payload:result})
    } catch (error) {
        res.send({result:'error'})
        console.log(`MongoDB: couldn't update product ${title} \n ERROR: ${error}`)
    }
})

router.delete('/:uid',async (req,res)=>{
    let {uid} = req.params

    let result = await productDao.deleteOne({_id:uid})
    res.send({status:'success',payload:{result}})

})

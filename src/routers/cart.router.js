import Router from 'express'
import {cartDao} from '../daos/dao/index.js'

export const router = Router()

router.get('/',async (req,res)=>{
    try{
        let carts= await cartDao.find()
        res.send({result:'succes',payload:carts})
    }catch(error){
        console.log(`MongoDB: cannot get carts \n ERROR: ${error}`)
    }
})


router.post('/',async (req,res)=>{
    let {products} = req.body

    //considerar si es obigatorio o no inicializar un carrito con productos
/*     if(!value){
        return res.send({status:'error',error:`${key} es obligatorio`})
    } */

    try{
        let newCart= await cartDao.create({products})

        res.send({result:'success',payload:newCart})

    }catch(error){
        res.send({result:'error'})
        console.log(`MongoDB: couldn't create cart \n ERROR: ${error}`)
    }
})

router.put('/:uid', async(req,res)=>{
    let {uid} = req.params
    
    let {products} = req.body

    try {
        let result = await cartDao.updateOne({_id:uid},products)
        res.send({status:'success',payload:result})
    } catch (error) {
        res.send({result:'error'})
        console.log(`MongoDB: couldn't update cart\n ERROR: ${error}`)
    }
})

router.delete('/:uid',async (req,res)=>{
    let {uid} = req.params

    let result = await cartDao.deleteOne({_id:uid})
    res.send({status:'success',payload:`Se elimino carrito ${result}`})

})

import util from 'node:util'
import Router from 'express'
import {cartDao} from '../daos/dao/index.js'

export const router = Router()

router.get('/:cid',async (req,res)=>{
    let {cid} = req.params

    try{
        let carts= await cartDao.find({ _id: cid })
        res.send({result:'succes',payload:carts})
    }catch(error){
        console.log(`MongoDB: cannot get carts \n ERROR: ${error}`)
    }
})

router.get('/',async (req,res)=>{
    try{
        let carts= await cartDao.find().lean()
        res.send({result:'succes',payload:carts})
    }catch(error){
        console.log(`MongoDB: cannot get carts \n ERROR: ${error}`)
    }
})




router.get('/populate',async(req,res)=>{

    const cartsJSON =[
        {
          products: [
            {
              product: "05229ecd-8575-40e7-8787-3513bfdd6770",
              counter: 2
            },
            {
              product: "3e4ac184-6940-4480-817d-2eb06d743cb4",
              counter: 1
            }
          ]
        },
        {
          products: [
            {
                product: "05229ecd-8575-40e7-8787-3513bfdd6770",
                counter: 5
              },
          ]
        },
        {
          products: [
            {
                product: "05229ecd-8575-40e7-8787-3513bfdd6770",
                counter: 2
              },
              {
                product: "57063617-3270-4435-8959-f74859da4ab9",
                counter: 1
              }
          ]
        },
        {
          products: [
            {
              product: "3e4ac184-6940-4480-817d-2eb06d743cb4",
              counter: 2
            },
            {
              product: "05229ecd-8575-40e7-8787-3513bfdd6770",
              counter: 2
            },
            {
              product: "57063617-3270-4435-8959-f74859da4ab9",
              counter: 1
            }
          ]
        },
        {
          products: [
            {
              product: "3e4ac184-6940-4480-817d-2eb06d743cb4",
              counter: 1
            }
          ]
        }
      ]
      
    try {
        await cartDao.deleteMany({})
/*         let result = await cartDao.create({
            products: [
              {
                product: "3e4ac184-6940-4480-817d-2eb06d743cb4",
                counter: 2
              },
              {
                product: "05229ecd-8575-40e7-8787-3513bfdd6770",
                counter: 2
              },
              {
                product: "57063617-3270-4435-8959-f74859da4ab9",
                counter: 1
              }
            ]
          })    */     
/*         for (const carts of cartsJSON) {
            let result = await cartDao.create({})
            await Student.findByIdAndUpdate(
                result._id,
                { $push: { courses: { _id: curso._id } } },
                { new: true })
                
            } */

            
        let result = await cartDao.create(cartsJSON)

        //let result = await cartDao.find()
        res.send({status:'success',payload:result})
    } catch (error) {
        res.send({result:'error'})
        console.log(`MongoDB: couldn't create carts \n ERROR: ${error}`)
    }
})
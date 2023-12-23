//import util from 'node:util'
import Router from 'express'
import {cartDao} from '../daos/dao/index.js'

export const router = Router()

//94f02235-0aab-4610-8fed-790a63d072d6
//localhost:8080/api/carts/12785059-4d9e-48ce-984e-d8bda728c490/products/3e4ac184-6940-4480-817d-2eb06d743cb4
//localhost:8080/api/carts/:cid/products/:pid
//12785059-4d9e-48ce-984e-d8bda728c490
//3e4ac184-6940-4480-817d-2eb06d743cb4 Laptop

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
          
      let carts = await cartDao.create(cartsJSON)

      res.send({status:'success',payload:carts})
  } catch (error) {
      res.send({result:'error'})
      console.log(`MongoDB: couldn't create carts \n ERROR: ${error}`)
  }
})


//traer todos los carritos
router.get('/',async (req,res)=>{
  try{
      let carts= await cartDao.find().lean()
      res.send({result:'succes',payload:carts})
  }catch(error){
      console.log(`MongoDB: cannot get carts \n ERROR: ${error}`)
  }
})


//traer los productos del carrito
router.get('/:cid',async (req,res)=>{
    let {cid} = req.params

    try{
        let carts= await cartDao.find({ _id:cid})
        res.send({result:'succes',payload:carts})
    }catch(error){
        console.log(`MongoDB: cannot get carts \n ERROR: ${error}`)
    }
})


// agregar/actualizar producto con una cantidad counter
router.put('/:cid/products/:pid',async (req,res)=>{
  let {cid, pid} = req.params
  let {counter} = req.body 

  if(counter<0){
    res.send({result:'error',message:"no puedes actualizar a un valor menor"})
  }

  try{
      let cart= await cartDao.findOneAndUpdate({_id:cid, 'products.product':pid},
         { $set:{'products.$.counter':counter} }, 
         { new: true})

      if(!cart){
        let cart= await cartDao.findByIdAndUpdate({_id:cid},
          { $push: { products: { product: pid, counter: counter} } })

        if(!cart){
          res.send({result:'error',message:"el carrito no se encuentra, no es posible actualizar"})
        }
      }

      res.send({result:'succes',payload:cart})
  }catch(error){
      console.log(`MongoDB: cannot get carts \n ERROR: ${error}`)
  }
})


//elimina el producto acorde a su pid
router.delete('/:cid/products/:pid',async (req,res)=>{
  let {cid, pid} = req.params

  try{
      let cart= await cartDao.findOneAndUpdate({_id:cid},
        { $pull: { products: { product: pid } } },
        { new: true})

      if(!cart){        
        res.send({result:'error',message:"ese producto o carrito no se encuentra en el carrito, no es posible actualizar"})
      }

      res.send({result:'succes',payload:cart})
  }catch(error){
      console.log(`MongoDB: cannot get carts \n ERROR: ${error}`)
  }
})


//vacia el products de carrito
router.delete('/:cid',async (req,res)=>{
  let {cid, pid} = req.params

  try{

      let cart= await cartDao.findOneAndUpdate({_id:cid},
        { $set: { products: { } } },
        { new: true})

      if(!cart){
        res.send({result:'error',message:"ese producto o carrito no se encuentra en el carrito, no es posible actualizar"})
      }

      res.send({result:'succes',payload:cart})
  }catch(error){
      console.log(`MongoDB: cannot get carts \n ERROR: ${error}`)
  }
})

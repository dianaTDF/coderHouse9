import Router from 'express'
import {productDao} from '../daos/dao/index.js'

export const router = Router()





router.get('/populate',async(req,res)=>{

    const productsJSON =[ // ya se, no dicimule de donde saque el array XD
        {
          title: 'Laptop',
          description: 'Powerful laptop with high-performance features.',
          code: 'LP001',
          price: 129,
          status: 'Active',
          stock: 20,
          category: 'Electronics',
          thumbnails: ['laptop1.jpg', 'laptop2.jpg'],
        },
        {
          title: 'Smartphone',
          description: 'Latest smartphone with advanced camera and features.',
          code: 'SP002',
          price: 799,
          status: 'Active',
          stock: 30,
          category: 'Electronics',
          thumbnails: ['phone1.jpg', 'phone2.jpg'],
        },
        {
          title: 'Coffee Maker',
          description: 'Modern coffee maker for brewing delicious coffee.',
          code: 'CM003',
          price: 89,
          status: 'Active',
          stock: 15,
          category: 'Appliances',
          thumbnails: ['coffee_maker1.jpg', 'coffee_maker2.jpg'],
        },
        {
          title: 'Running Shoes',
          description: 'Comfortable running shoes for fitness enthusiasts.',
          code: 'RS004',
          price: 69,
          status: 'Active',
          stock: 25,
          category: 'Fashion',
          thumbnails: ['shoes1.jpg', 'shoes2.jpg'],
        },
        {
          title: 'Desk Chair',
          description: 'Ergonomic desk chair for a comfortable workspace.',
          code: 'DC005',
          price: 149,
          status: 'Active',
          stock: 10,
          category: 'Furniture',
          thumbnails: ['chair1.jpg', 'chair2.jpg'],
        },
        {
          title: 'Headphones',
          description: 'High-quality headphones for immersive audio experience.',
          code: 'HP006',
          price: 129,
          status: 'Active',
          stock: 18,
          category: 'Electronics',
          thumbnails: ['headphones1.jpg', 'headphones2.jpg'],
        },
        {
          title: 'Backpack',
          description: 'Durable backpack for carrying essentials on the go.',
          code: 'BP007',
          price: 49,
          status: 'Active',
          stock: 22,
          category: 'Fashion',
          thumbnails: ['backpack1.jpg', 'backpack2.jpg'],
        },
      ]
      


    try {
        await productDao.deleteMany({})

        let result = await productDao.create(productsJSON)
        res.send({status:'success',payload:result})
    } catch (error) {
        res.send({result:'error'})
        console.log(`MongoDB: couldn't create products \n ERROR: ${error}`)
    }
})



router.get('/',async (req,res)=>{
    let options={limit:10, page:1}
    const  {limit=10, page=1, sort, query} = req.query 
    
    if (sort){
        if (sort== 'desc'){            
            options.sort = {price: -1}
        }
        if (sort== 'adc'){
            options.sort = {price: 1}
        }        
    }
    options.limit = limit
    options.page = page

    const title = query ? { title: query } : {};



    try{
        let products = await productDao.paginate(title,options)
        //let products= await productDao.find()
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

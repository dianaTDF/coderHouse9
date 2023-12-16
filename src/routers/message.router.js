import Router from 'express'
import {messageDao} from '../daos/dao/index.js'

export const router = Router()

router.get('/',async (req,res)=>{
    try{
        let messages= await messageDao.find()
        res.send({result:'succes',payload:messages})
    }catch(error){
        console.log(`MongoDB: cannot get messages \n ERROR: ${error}`)
    }
})


router.post('/',async (req,res)=>{
    let {message, user} = req.body

    if(!message || !user){
        return res.send({status:'error',error:`faltan datos`})
    }

    try{
        let newMessage= await messageDao.create({message,user})

        res.send({result:'success',payload:newMessage})
    }catch(error){
        res.send({result:'error'})
        console.log(`MongoDB: couldn't create message \n ERROR: ${error}`)
    }
})



/* 
algo rapido para testear

router.post('/all',async (req,res)=>{
    let messages = req.body   

    try{
        let newmessages= await messageDao.insertMany(messages)

        res.send({result:'success',payload:newmessages})
    }catch(error){
        res.send({result:'error'})
        console.log(`MongoDB: couldn't create message \n ERROR: ${error}`)
        console.log(messages)
    }
})


  {
    "user": "marta@mail.com",
    "message": "Hola, ¿cómo estás?"
  },
  {
    "user": "juan@mail.com",
    "message": "Saludos desde el otro lado."
  },
  {
    "user": "pepe@mail.com",
    "message": "¡Bienvenido al chat!"
  },
  {
    "user": "marta@mail.com",
    "message": "Estoy trabajando en un proyecto interesante."
  },
  {
    "user": "juan@mail.com",
    "message": "¿Has probado la nueva función?"
  },
  {
    "user": "pepe@mail.com",
    "message": "Sí, la he probado. Es genial."
  },
  {
    "user": "marta@mail.com",
    "message": "¿Cuándo podemos reunirnos?"
  },
  {
    "user": "juan@mail.com",
    "message": "Estoy disponible mañana por la tarde."
  },
  {
    "user": "pepe@mail.com",
    "message": "Perfecto, nos vemos entonces."
  },
  {
    "user": "marta@mail.com",
    "message": "Hasta pronto."
  }
*/

//lo cree por si acaso, pero no se si siendo mensajes se necesita esta ruta
router.put('/:uid', async(req,res)=>{
    let {uid} = req.params
    
    let {message} = req.body

    try {
        let result = await messageDao.updateOne({_id:uid},message)
        res.send({status:'success',payload:result})
    } catch (error) {
        res.send({result:'error'})
        console.log(`MongoDB: couldn't update message\n ERROR: ${error}`)
    }
})

router.delete('/:uid',async (req,res)=>{
    let {uid} = req.params

    let result = await messageDao.deleteOne({_id:uid})
    res.send({status:'success',payload:`Se elimino el mensaje ${result}`})
})

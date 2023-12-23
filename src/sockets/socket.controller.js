import { productDao, messageDao, cartDao } from "../daos/dao/index.js"

export function onConnection(socketServer){
    return async function (socket){

        console.log(`${socket.id} conected`)

        /* -------------------------------------------------------------------------- */
        /*                                      /                                     */
        /* -------------------------------------------------------------------------- */
        
        /* ----------------------- mostrar lista de productos ----------------------- */
        try {
            socketServer.emit('prodList',await productDao.find())
        } catch (error) {
            console.log('Error: could not send products')
            socket.emit('errorMessage',{message:`No se pudo mandar los productos`})
        }


        /* ---------------------------- agregar producto ---------------------------- */
        socket.on('prodAdd',async (product)=>{
            const newProd = JSON.parse(product)
            
            newProd.thumbnails=''
            if(newProd.status == '1'){
                newProd.status=true
              }else{
                newProd.status=false
              }
    
            console.log(newProd)
            try {
                await productDao.create(newProd)
                console.log(`newProdo ${newProd.title} agregado`)            
                socketServer.emit('prodList',await productDao.find())
                
            } catch (error) {
                console.log(`Error al ingresar producto, avisando a usuario`)                        
                socket.emit('errorMessage',{message:`Error al ingresar producto, revice los datos`})
            }
        })


        /* ------------------------- eliminacion por socket ------------------------- */
        socket.on('prodDel',async (pid)=>{
            console.log(`usuario quiere eliminar producto ${pid}`)

            try {
                await productDao.deleteOne({_id:pid})
                console.log(`producto eliminado correctamente`)
                socket.emit('successMessage',{message:`producto eliminado correctamente`})            
                socketServer.emit('prodList',await productDao.find())
            } catch (error) {
                console.log(`error al eliminar producto`)
                socket.emit('errorMessage',{message:`Error al eliminar el producto`})            

            }
        })

        /* -------------------------------------------------------------------------- */
        /*                           los eventos de mensajes                          */
        /* -------------------------------------------------------------------------- */

        /* ---------------------------- enlistar mensajes --------------------------- */
        try {
            socketServer.emit('messagesList',await messageDao.find())
        } catch (error) {
            console.log('Error: could not send messages')
            socket.emit('errorMessage',{message:`No se pudo mandar los mensajes`})
        }

        /* ----------------------------- agregar mensaje ---------------------------- */
        socket.on('messageAdd',async (message) =>{
            //const newmessage = JSON.parse(message)
            
            
            console.log(message)
            try {
                await messageDao.create(message)
                console.log(`Nuevo mensaje agregado`)            
                socketServer.emit('messagesList',await messageDao.find())
                
            } catch (error) {
                console.log(`Error al ingresar mensaje, avisando a usuario`)                        
                socket.emit('errorMessage',{message:`Su mensaje no ha ingresado`})
            }           
        })



        /* -------------------------------------------------------------------------- */
        /*                                 /products/                                 */
        /* -------------------------------------------------------------------------- */
        socket.on('addProduct',async (pid)=>{
            console.log('hola')
            if (!socket.cart){
                
                const newCart = await cartDao.create({})
                console.log(newCart)

                socket.cart = newCart._id
            }

            try {

                /*            
                    const cart = await cartDao.findOneAndUpdate( // faaa, es demasiado personalizable esto
                    { _id: socket.cart, 'products.product': pid },
                    { $inc: { 'products.$.counter': 1 }, 
                    $setOnInsert: { 'products.$': { product: pid, counter: 1 } } },
                    { new: true, upsert: true }
                    ) 

                    no consegui hacer que andara, me tirara error
                    TypeError [ERR_INVALID_ARG_TYPE]: The "options" argument must be of type object. Received null
                */
                
                let cart = await cartDao.findOne({ _id: socket.cart, 'products.product': pid })
                
                //console.log(cart)
                    if(!cart){                    
                    cart= await cartDao.findByIdAndUpdate({_id:socket.cart},
                        { $push: { products: { product: pid, counter: 1} } },
                        { new: true })  
                    }else{
                    cart = await cartDao.findOneAndUpdate(
                        { _id: socket.cart, 'products.product': pid },
                        { $inc: { 'products.$.counter': 1 } },
                        { new: true }
                        );
                    }

                console.log(cart)
                socket.emit('checkCart',socket.cart)

            } catch (error) {

                console.log(error)                    
                socket.emit('errorMessage',{message:`no se ha agregado el producto a su carrito`})
            }

        })


    }

}
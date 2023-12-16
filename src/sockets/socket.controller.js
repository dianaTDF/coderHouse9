import { productDao, messageDao } from "../daos/dao/index.js"

export function onConnection(socketServer){
    return async function (socket){

        console.log(`${socket.id} conected`)

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

    }

}
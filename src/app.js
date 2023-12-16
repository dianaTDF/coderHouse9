import express  from "express"
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import {PORT} from './config.js'
import {router as apiRouter} from './routers/api.router.js'
import {router as webRouter} from './routers/web.router.js'
import { onConnection } from "./sockets/socket.controller.js"

const app = express()
app.engine('handlebars',handlebars.engine())

const server = app.listen(PORT, ()=>{
    console.log(`conected to port ${PORT}`)
})


const socketServer= new Server(server)
socketServer.on('connection', onConnection(socketServer))



app.use(express.json())
app.use('/statics', express.static('./statics'))
app.use('/api',apiRouter)
app.use('/',webRouter)

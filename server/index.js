import express from 'express'
import morgan from 'morgan'
import { Server as SocketServer} from 'socket.io'
import http from 'http'
import cors from 'cors'
import {PORT} from './config.js'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
const server = http.createServer(app)
const io=new SocketServer(server,{
      cors:{
            origin:'*'
      }
})
app.use(cors())
app.use(morgan('tiny'))
io.on('connection',(socket)=>{
      socket.on("mensaje",(message)=>{            
            socket.broadcast.emit("mensaje",{
                  body:message,
                  from:socket.id.slice(0,6)
            })
      })
})
app.use(express.static(join(__dirname,"../client/build")))
server.listen(PORT)
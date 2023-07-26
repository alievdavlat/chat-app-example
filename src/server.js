const express = require('express')
const app = express()
const path = require('path')
const { Server } = require('socket.io')

app.use(express.static(path.join(process.cwd(), 'public')))

const httpServer = app.listen(8000 , console.log('server running on port 8000'))

const socketIo = new Server(httpServer)

socketIo.on( 'connection' , socket => {
 socket.on('user-joined', ( { name }) => {
 socket.broadcast.emit('new-user-joined', name)
 })

 socket.on('new-message', data => {
  socket.broadcast.emit('new-user-message', data)
})

socket.on('typing', data => {

  socket.broadcast.emit('user-typing', data)
})

})
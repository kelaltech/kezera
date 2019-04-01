import { Socket } from 'socket.io'

export function SocketManager(io: Socket) {
  io.on('Comment', function() {
    console.log('Recieved')
    io.broadcast.emit('CommentAltered')
  })
  io.on('CommentAdded', function() {
    console.log('Added')
    io.broadcast.emit('CommentAdded')
  })
  io.on('CommentDeleted', function() {
    console.log('Added')
    io.broadcast.emit('CommentDeleted')
  })
}

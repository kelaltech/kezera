import { Socket } from 'socket.io'

export function SocketManager(io: Socket) {
  io.on('Comment', function() {
    console.log('Recieved')
    io.broadcast.emit('CommentAltered')
  })
  io.on('CommentAdded', function() {
    console.log('Added')
    io.broadcast.emit('COMMENT_ADDED')
  })
  io.on('CommentDeleted', function() {
    console.log('Deleted')
    io.broadcast.emit('CommentDeleted')
  })
  io.on('CommentReply', function() {
    console.log('Reply added')
    io.broadcast.emit('Replied')
  })
}

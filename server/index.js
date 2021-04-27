// debug logger
const debug = require('debug')('myapp')

/**
 * Setup Express (http) Server
 */

const express = require('express')
const app = express()
const httpPort = 3000

// listen
app.listen(httpPort, () => {
  debug(`Express Server listening at http://localhost:${httpPort}`)
})

// serve up all the project files
app.use(express.static('./'))

/**
 * Setup Socket.io (ws) Server
 */
const io = require('socket.io')(3001, {
  cors: {
    origin: 'http://localhost:' + httpPort,
    methods: ["GET", "POST"],
  }
})

// debug logger
debug('Socket.IO Server listening at ws://localhost:3001')

// send out data to clients
function send(coord) {
  debug('send')

  // bomb out if there are no clients
  if (io.engine.clientsCount === 0) return

  // create data to send
  const data = {
    x: coord.x,
    y: coord.y,
    // rnd color
    c: Math.random()
  }

  // emit the data
  io.emit('update', data)

}

/**
 * Handle when a client connects
 */
io.on('connection', socket => {
  debug('connection')

  socket.emit('connected')

  // handle when the client sends data
  socket.on('update', (data) => {
    debug('update', data)
    send({ ...data })
  })

})

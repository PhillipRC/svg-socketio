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

// debug logger
const io = require('socket.io')(3001, {
  cors: {
    origin: 'http://localhost:' + httpPort,
    methods: ["GET", "POST"],
  }
})

debug('Socket.IO Server listening at ws://localhost:3001')

// send rnd data to clients
function sendRnd() {
  debug('sendRnd')

  // bomb out if there are no clients
  if (io.engine.clientsCount === 0) return

  // create rnd data
  const data = {
    x: Math.random(),
    y: Math.random(),
    c: Math.random()
  }

  // emit the data
  io.emit('update', data)

  // send more rnd data later
  setTimeout(sendRnd, 100);
}

/**
 * Handle when a client connects
 */
io.on('connection', socket => {
  debug('connection')
  socket.emit('connected')
  // send rnd data
  sendRnd()
})


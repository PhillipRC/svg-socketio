import App from './App.js';

// reference to the socket.io connection
let socket

/**
 * Connection to server wrapped in promise allow us to wait for the connection
 */
function connect() {

  // create socket.io connection
  socket = io("http://localhost:3001")

  return new Promise(resolve => {

    socket.on("connected", () => {
      console.debug('connected')
      resolve()
    })

  });

}

// get the output element for the app
const outputElement = document.getElementById("client");

// message while waiting for connection
outputElement.innerText = 'Connecting ....'

// wait for connection
await connect()

// message after connected
outputElement.innerText = ''

// kick off client app
const app = new App(socket, outputElement)

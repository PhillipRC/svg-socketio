export default class App {

  constructor(socket, outputElement) {
    console.debug('App:constructor')

    // save reference to the socket
    this.socket = socket

    // create an svg document for the display
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    // set viewbox
    this.svg.setAttribute("viewBox", "0 0 1 1");

    // style to fill available space
    const style = "width:100%;" +
      "height:100%;" +
      "position:absolute;" +
      "top:0;" +
      "left:0"
    this.svg.setAttribute("style", style)

    // append SVG to outputElement
    outputElement.appendChild(this.svg);

    // listen for update message from server
    this.socket.on("update", this.handleUpdateMessage)

    // listen for click on SVG container
    this.svg.addEventListener('click', this.handleSvgClick)

  }

  /**
   * SVG container click handler
   */
  handleSvgClick = (event) => {
    console.debug('App:handleSvgClick')
    // create a SVG point
    let point = this.svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    // get matrix
    let ctm = this.svg.getScreenCTM().inverse();
    // transform coordinates
    point = point.matrixTransform(ctm);
    // send to server
    this.socket.emit('update', { x: point.x, y: point.y })
  }

  /**
   * Plot the data return as colored circles
   */
  handleUpdateMessage = (data) => {
    console.debug('App:handleUpdateMessage')
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", data.x);
    circle.setAttribute("cy", data.y);
    circle.setAttribute("r", ".03");
    // scale color data into a degree (0-360)
    const deg = (Math.round(data.c * 360))
    const hsl = "hsl(" + deg + "deg 40% 45%)"
    circle.setAttribute("fill", hsl);
    this.svg.appendChild(circle);
  }

}

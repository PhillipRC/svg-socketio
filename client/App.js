export default class App {

  constructor(socket, outputElement) {
    console.debug('App:constructor')

    // create an svg document for the display
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    // set viewbox
    svg.setAttribute("viewBox", "0 0 1 1");

    // style to fill available space
    const style = "width:100%;" +
      "height:100%;" +
      "position:absolute;" +
      "top:0;" +
      "left:0"
    svg.setAttribute("style", style)

    // append SVG to outputElement
    outputElement.appendChild(svg);

    // handle update message from server
    socket.on("update", (data) => {
      this.handleUpdateMessage(svg, data)
    })

  }

  /**
   * Plot the data return as colored circles
   */
  handleUpdateMessage = (svg, data) => {
    console.debug('App:handleUpdateMessage')
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", data.x);
    circle.setAttribute("cy", data.y);
    circle.setAttribute("r", ".03");
    // scale color data into a degree (0-360)
    const deg = (Math.round(data.c * 360))
    const hsl = "hsl(" + deg + "deg 40% 45%)"
    circle.setAttribute("fill", hsl);
    svg.appendChild(circle);
  }

}

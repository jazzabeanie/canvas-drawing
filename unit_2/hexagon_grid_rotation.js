const canvasSketch = require('canvas-sketch');
const pencil = require("../pencilCase.js")

const settings = {
  dimensions: [ 1080, 1080 ]
};

const initRotation = 0
var scale = 0
const refreshRate = 10

const draw = ({ context, width, height }) => {
  scale += 0.01
  context.fillStyle = 'white';
  context.fillRect(0, 0, width, height);

  context.fillStyle = "black";

  const hexagon = (x, y, w, h, additionalRotation = 1) => {
    const innerAngle = 120;
    const externalTriangleAccuteAngle = 90 - (innerAngle/2)
    const externalTriangleAccuteAngleRad = externalTriangleAccuteAngle*Math.PI/180
    const xPoint = w/2;
    const yPoint = xPoint * Math.tan(externalTriangleAccuteAngleRad)
    const side = yPoint / Math.sin(externalTriangleAccuteAngleRad)
    const shortSide = h - 2*yPoint
    // console.log(`side: ${side}`)

    context.save()
    context.translate(x, y);
    context.translate(w/2, h/2); // get to the center

    // TOO: implement rotation on a timer like grid-of-rotation
    context.rotate(initRotation + additionalRotation * scale);
    // context.rotate(initRotation + 1 * scale); 

    context.lineWidth = (additionalRotation+0.2) * 1.5;
    context.beginPath();
    context.moveTo(-w/2, -h/2+yPoint); // move to top left corner
    context.lineTo(-w/2 + xPoint, -h/2);
    context.lineTo(-w/2 + 2*xPoint, -h/2+yPoint);
    context.lineTo(-w/2 + 2*xPoint, -h/2 + yPoint + shortSide);
    context.lineTo(-w/2 + xPoint, -h/2 + h);
    // console.log(`bottom point = ${-h/2 + 2*yPoint + shortSide}`)
    context.lineTo(-w/2, -h/2 + yPoint + shortSide);
    context.lineTo(-w/2, -h/2+yPoint);
    context.stroke();
    context.restore()
  }

  const emptySquare = (x, y, w, h) => {
    context.strokeRect(x, y, w, h);
  }
  const whole = new pencil.Space({
    box: {
      x: 0,
      y: 0,
      width: width,
      height: height
    }
  });
  // whole.create(hexagon)
  const gridX = 18
  const gridY = 24
  const wholeGrid = whole.grid(gridX, gridY)
  // console.log(`wholeGrid = ${JSON.stringify(wholeGrid)}`);
  const stretchFactor = gridY/gridX // TODO: FIXME: how is this calculated?
  // console.log(`stretchFactor = ${stretchFactor}`)
  pencil.hexagonise(wholeGrid, 1.5)
  wholeGrid.forEach((square, index) => {square.create(hexagon, (index+1)/500)})
  // wholeGrid.forEach(square => square.create(emptySquare)) // for debuging purposes
};

const sketch = () => {
  return ({ context, width, height }) => {
    refreshID = setInterval(function () {
      draw({context, width, height});
    }, refreshRate);
    // draw({context, width, height});
    // setTimeout(function () {
    //   draw({context, width, height});
    // }, 1000);
  };
};

canvasSketch(sketch, settings);

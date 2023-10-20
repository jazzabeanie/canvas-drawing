const canvasSketch = require('canvas-sketch');
const pencil = require("../pencilCase.js")

const settings = {
  dimensions: [ 1080, 1080 ]
};

const initRotation = 0
var scale = 0
const refreshRate = 10

const draw2 = ({ context, width, height }) => {
  context.fillStyle = "black";
  console.log("fill")
  context.fillRect(100, 100, 100, 100)
}

const draw = ({ context, width, height }) => {
  scale += 0.01
  context.fillStyle = 'white';
  context.fillRect(0, 0, width, height);

  context.fillStyle = "black";
  context.strokeStyle = "black"

  const hexagon = (x, y, w, h, additionalRotation = 1) => {
    // lineWidth = 1 // (additionalRotation+0.2) * 1.5;
    rotation = initRotation + additionalRotation * scale
    lineWidth = (Math.sin(rotation)+1.25)/2
    pencil.drawHexagon(context, x, y, w, h, rotation, lineWidth)
  }

  const emptySquare = (x, y, w, h) => {
    console.log("emptySquare")
    
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
  const rows = 18
  const cols = 24
  const wholeGrid = whole.grid(rows, cols)
  // console.log(`wholeGrid = ${JSON.stringify(wholeGrid)}`);
  // const stretchFactor = cols/rows // TODO: FIXME: how is this calculated?
  const stretchFactor = 1.5 // 1.5 seems to be the right value for 18 by 24.
  console.log(`stretchFactor = ${stretchFactor}`)
  pencil.hexagonise(wholeGrid, stretchFactor);
  wholeGrid.forEach((square, index) => {square.create(hexagon, additionalRotation=(index+1)/200)});
  // wholeGrid.forEach(square => square.create(emptySquare)) // for debuging purposes
};

const sketch = () => {
  return ({ context, width, height }) => {
    // draw({context, width, height});
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

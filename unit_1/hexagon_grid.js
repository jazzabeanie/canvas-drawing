const canvasSketch = require('canvas-sketch');
const pencil = require("../pencilCase.js")

const settings = {
  dimensions: [ 1080, 1248 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    context.fillStyle = "black";
    
    const hexagon = (x, y, w, h) => {
      const innerAngle = 120;
      const externalTriangleAccuteAngle = 90 - (innerAngle/2)
      const externalTriangleAccuteAngleRad = externalTriangleAccuteAngle*Math.PI/180
      const xPoint = w/2;
      const yPoint = xPoint * Math.tan(externalTriangleAccuteAngleRad)
      const side = yPoint / Math.sin(externalTriangleAccuteAngleRad)
      console.log(`side: ${side}`)
      context.beginPath();
      context.moveTo(x, y+yPoint); // move to top left corner
      context.lineTo(x + xPoint, y);
      context.lineTo(x + 2*xPoint, y+yPoint);
      context.lineTo(x + 2*xPoint, y + yPoint + side);
      context.lineTo(x + xPoint, y + 2*yPoint + side);
      console.log(`bottom point = ${y + 2*yPoint + side}`)
      context.lineTo(x, y + yPoint + side);
      context.lineTo(x, y+yPoint);
      context.stroke();
    }

    const whole = new pencil.Space({
      box: {
        x: 0,
        y: 0,
        width: width,
        height: height
      }
    });
    whole.create(hexagon)
    // const wholeGrid = whole.grid(2, 2)
    // console.log(`wholeGrid = ${JSON.stringify(wholeGrid)}`);
    // wholeGrid.forEach(square => square.create(hexagon))
  };
};

canvasSketch(sketch, settings);

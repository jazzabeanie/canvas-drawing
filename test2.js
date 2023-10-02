const canvasSketch = require('canvas-sketch');
const pencil = require("./pencilCase.js")

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    context.fillStyle = "black";
    
    const fillCenter = (x, y, w, h) => {
      const fraction = 0.5
      context.fillRect(
        x + w/2 - w*fraction/2,  // + w/2 gets us to the center, then subtract half the width
        y + h/2 - h*fraction/2, 
        w*fraction, 
        h*fraction
      );
    }

    const whole = new pencil.Space({
      box: {
        x: 0,
        y: 0,
        width: width,
        height: height
      }
    });
    const wholeGrid = whole.grid(2, 2)
    
    console.log(`wholeGrid = ${JSON.stringify(wholeGrid)}`);
    wholeGrid.forEach(square => square.create(fillCenter))
  };
};

canvasSketch(sketch, settings);

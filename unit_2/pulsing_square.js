const canvasSketch = require("canvas-sketch");
const pencil = require("../pencilCase.js");

const settings = {
  dimensions: [1080, 1080],
};

const refreshRate = 10;
var itteration = 0;

const draw = ({ context, width, height }) => {
  itteration++;
  context.fillStyle = "white";
  context.fillRect(0, 0, width, height);

  const whole = new pencil.Space({
    box: {
      x: 0,
      y: 0,
      width: width,
      height: height,
    },
  });

  const pulsingBox = (x, y, w, h, pulse, fillStyle, buffer = 0) => {
    pencil.pulsingBox(
      context,
      x,
      y,
      w,
      h,
      itteration,
      pulse,
      (rotation = undefined),
      fillStyle,
      buffer
    );
  };

  const emptySquare = (x, y, w, h) => {
    console.log("emptySquare");
    context.strokeStyle = "red";
    context.strokeRect(x, y, w, h);
  };

  whole.create(pulsingBox, (pulse = 155), (fillStyle = "black"));

  const rows = 3;
  const cols = 3;
  const wholeGrid = whole.grid(rows, cols);
  wholeGrid.forEach((square, index) => {
    square.create(pulsingBox, (pulse = 20), (fillStyle = "red"), (buffer = 10));
    // square.create(emptySquare);
  });
};

const sketch = () => {
  return ({ context, width, height }) => {
    draw({ context, width, height });
    refreshID = setInterval(function () {
      draw({ context, width, height });
    }, refreshRate);
  };
};

canvasSketch(sketch, settings);

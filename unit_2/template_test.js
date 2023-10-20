const canvasSketch = require("canvas-sketch");
const pencil = require("../pencilCase.js");

const settings = {
  dimensions: [1080, 1080],
};

const refreshRate = 10;

const draw = ({ context, width, height }) => {
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

  whole.create((x, y, w, h) => {
    context.save();
    context.fillStyle = "black";
    context.fillRect(x, y, w, h);
    context.restore();
  });
};

const sketch = () => {
  return ({ context, width, height }) => {
    draw({ context, width, height });
    // refreshID = setInterval(function () {
    //   draw({context, width, height});
    // }, refreshRate);
  };
};

canvasSketch(sketch, settings);

const canvasSketch = require("canvas-sketch");
const pencil = require("../pencilCase.js");

const settings = {
  dimensions: [1080, 1080],
};

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

  pencil.drawHexagon(
    context,
    0,
    0,
    width,
    height,
    (rotation = undefined),
    (lineWidth = undefined),
    (buffer = 100)
  );
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

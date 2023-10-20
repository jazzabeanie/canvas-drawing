const canvasSketch = require("canvas-sketch");
const pencil = require("../pencilCase.js");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

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
};

canvasSketch(sketch, settings);

const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [600, 600],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const squares = Array.from(Array(5));

    // const xOffset = 0.25;
    // const yOffset = 0.25;
    // const w = 0.5;
    // const h = 0.5;
    const w = Math.random();
    const h = w;
    const xOffset = (1 - w) / 2;
    const yOffset = (1 - h) / 2;

    squares.forEach((_, x) => {
      squares.forEach((_, y) => {
        context.fillStyle = "black";
        context.fillRect(
          (xOffset * width) / squares.length + (x * width) / squares.length,
          (yOffset * width) / squares.length + (y * height) / squares.length,
          (w * width) / squares.length,
          (h * height) / squares.length,
        );
      });
    });
  };
};

canvasSketch(sketch, settings);

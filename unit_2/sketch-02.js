const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    // const x = width * 0.2;
    // const y = height * 0.2;
    const x = 0;
    const y = 0;
    const w = width * 0.3;
    const h = height * 0.3;

    context.save();
    context.translate(300, 300);
    // console.log(Math.PI);
    context.rotate(0.25 * Math.PI);

    context.beginPath();
    context.fillRect(-w / 2, -h / 2, w, h);
    context.fill();

    context.restore();
    context.fillRect(0, 0, 100, 100);
  };
};

canvasSketch(sketch, settings);

// https://www.domestika.org/en/courses/2729-creative-coding-making-visuals-with-javascript/units/9669-sketch-transform
// 3:11

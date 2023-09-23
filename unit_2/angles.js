const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const rad = (degrees) => (degrees / 180) * Math.PI;

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const x = 0;
    const y = 0;
    const w = width * 0.1;
    const h = height * 0.01;
    console.log(`w = ${w}`);
    console.log(`h = ${h}`);

    const radiusToCenter = width * 0.3;
    const numTicks = 12;
    const rotation = (2 * Math.PI) / numTicks;
    const ticks = Array.from(Array(numTicks));
    ticks.forEach((_, i) => {
      ticks[i] = i * rotation;
    });
    console.log(`ticks = ${ticks}`);

    context.fillStyle = "black";
    context.translate(width / 2, height / 2);
    context.fillRect(-5, -5, 10, 10);
    ticks.forEach((r) => {
      console.log(`drawing r = ${r}`);
      context.save();
      context.rotate(r);
      context.fillRect(radiusToCenter, -h * 0.5, w, h);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);

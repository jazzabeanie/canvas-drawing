const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const initRotation = 0.25 * Math.PI;
var scale = 0
const refreshRate = 100

const draw = (context, width, height) => {
  scale += 0.0001

  function Space(map) {
      this.map = map;
  };

  Space.prototype.grid = function(x, y) {
    // const gridArray = Array.from(Array(x * y))
    const gridArray = []
    console.log(`this.map = ${JSON.stringify(this.map)}`);
    Array.from(Array(x), (_, xIndex) => {
      console.log(`this.map = ${JSON.stringify(this.map)}`);
      Array.from(Array(y), (_, yIndex) => {
        innerSpaceWidth = this.map.square.width / x;
        innerSpaceHeight = this.map.square.height / y;
        gridArray.push(new Space({
          square: {
            x: this.map.square.x + innerSpaceWidth * xIndex,
            y: this.map.square.y + innerSpaceHeight * yIndex,
            width: this.map.square.width / x,
            height: this.map.square.height / y
          }
        }))
      })
    })
    // console.log(`grid created: ${gridArray}`)
    // console.log(`first item of gridArray: ${gridArray[0]}`)
    return gridArray
  }

  Space.prototype.create = function(func, ...args) {
    console.log(`this.map = ${JSON.stringify(this.map)}`);
    if (this.map.square) {
      console.log(`context = ${context}`)
      console.log(`draw from top left corner ${this.map.square.x}, ${this.map.square.y}, with width = ${this.map.square.width} and height = ${this.map.square.height}`)
      func(this.map.square.x, this.map.square.y, this.map.square.width, this.map.square.height, ...args)
    } else if (this.map.circle) {
      console.log(`draw from center point ${this.map.cirlce.x}, ${this.map.cirlce.y}`)
      console.log("TODO: call func with parameters")
    }
  }

  const spinningDiamond = (x, y, w, h, additionalRotation) => {
    context.save()
    context.translate(x, y);
    context.translate(w/2, h/2); // get to the center
    context.rotate(initRotation + additionalRotation * scale);

    context.beginPath();
    context.fillRect(-w / 4, -h / 4, w/2, h/2);
    context.fill();

    context.restore()
  }

  context.fillStyle = "white";
  context.fillRect(0, 0, width, height);

  context.fillStyle = "black";

  const whole = new Space({
    square: {
      x: 0,
      y: 0,
      width: width,
      height: height
    }
  });

  const wholeGrid = whole.grid(20, 20)

  console.log(`context = ${context}`)
  wholeGrid.forEach((square, index) => {square.create(spinningDiamond, index)})
  // wholeGrid.forEach(function (square) {
  //   square.create(spinningDiamond)
  // })
};

const sketch = () => {
  return ({ context, width, height }) => {
    refreshID = setInterval(function () {
      draw(context, width, height);
    }, refreshRate);
    // draw(context, width, height);
    // setTimeout(function () {
    //   draw(context, width, height);
    // }, 1000);
  };
};

canvasSketch(sketch, settings);

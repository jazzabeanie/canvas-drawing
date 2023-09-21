const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [600, 600],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    
    context.fillStyle = "black";
    
    const fillTopLeft = (x, y, w, h) => {
      context.fillRect(x, y, w, h);
    }
    
    function Space(map) {
        this.map = map;
    };
    Space.prototype.create = function(func) {
      console.log(`this.map = ${JSON.stringify(this.map)}`);
      if (this.map.square) {
        console.log(`draw from top left corner ${this.map.square.x}, ${this.map.square.y}, with width = ${this.map.square.width} and height = ${this.map.square.height}`)
        func(this.map.square.x, this.map.square.y, this.map.square.width, this.map.square.height)
      } else if (this.map.circle) {
        console.log(`draw from center point ${this.map.cirlce.x}, ${this.map.cirlce.y}`)
        console.log("TODO: call func with parameters")
      }
    }
    const s = new Space({
      square: {
        x: 10,
        y: 10,
        width: 20,
        height: 20
      }
    });
    s.create(fillTopLeft)
  };
};

canvasSketch(sketch, settings);

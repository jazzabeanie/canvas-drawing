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
      context.fillRect(x, y, w/2, h/2);
    }
    
    const fillCenter = (x, y, w, h) => {
      const fraction = 0.5
      context.fillRect(
        x + w/2 - w*fraction/2,  // + w/2 gets us to the center, then subtract half the width
        y + h/2 - h*fraction/2, 
        w*fraction, 
        h*fraction
      );
    }
    
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
          console.log(`TODO: create a space in ${xIndex}, ${yIndex} grid space`);
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
    const w = new Space({
      square: {
        x: 0,
        y: 0,
        width: width,
        height: height
      }
    });
    const wholeGrid = w.grid(9, 9)
    console.log(`wholeGrid = ${JSON.stringify(wholeGrid)}`);
    wholeGrid.forEach(square => square.create(fillCenter))
    //  w.create(fillTopLeft)
  };
};

canvasSketch(sketch, settings);

const hexInnerAngle = 120;
const hexExternalTriangleAccuteAngle = 90 - hexInnerAngle / 2;
const hexExternalTriangleAccuteAngleRad =
  (hexExternalTriangleAccuteAngle * Math.PI) / 180;

const hexagonise = (gridArray, stretchFactor = 1) => {
  gridArray.forEach((space) => {
    space.map.box.y =
      space.map.box.y +
      space.map.box.height * (stretchFactor - 1) * space.map.box.row;
    space.map.box.height = space.map.box.height * stretchFactor;
  });
  // Assume that the hexagon has it's points virtically, not horizontally and that the flat sides
  // are squished to fit it in the space (ie, angle is always 120 degrees)
  gridArray.forEach((space) => {
    const xPoint = space.map.box.width / 2;
    const yPoint = xPoint * Math.tan(hexExternalTriangleAccuteAngleRad);
    // console.log(`space = ${JSON.stringify(space)}`);
    // TODO: offset the row by the row number times the y offset value
    space.map.box.y += -yPoint * space.map.box.row;
    // console.log(`new space.map.box.y = ${space.map.box.y}`);
    if (space.map.box.row % 2 != 0) {
      // TODO: row nubmer is odd, therefor also offset by the x avlue
      space.map.box.x += xPoint;
      // console.log(`new space.map.box.x = ${space.map.box.x}`);
    }
  });
};

const drawHexagon = (
  context,
  x,
  y,
  w,
  h,
  rotation = 0,
  lineWidth = 1,
  buffer = 0
) => {
  console.log(
    `drawing hexagon: ${x}, ${y}, ${w}, ${h}, ${rotation}, ${lineWidth}, ${buffer}`
  );
  if (buffer > 0) {
    x = x + buffer;
    y = y + buffer;
    w = w - buffer * 2;
    h = h - buffer * 2;
  }
  const innerAngle = 120;
  const externalTriangleAccuteAngle = 90 - innerAngle / 2;
  const externalTriangleAccuteAngleRad =
    (externalTriangleAccuteAngle * Math.PI) / 180;
  const xPoint = w / 2;
  const yPoint = xPoint * Math.tan(externalTriangleAccuteAngleRad);
  const side = yPoint / Math.sin(externalTriangleAccuteAngleRad);
  const shortSide = h - 2 * yPoint;
  // console.log(`side: ${side}`)

  context.save();
  context.translate(x, y);
  context.translate(w / 2, h / 2); // get to the center

  context.rotate(rotation);

  context.lineWidth = lineWidth;
  context.beginPath();
  context.moveTo(-w / 2, -h / 2 + yPoint); // move to top left corner
  context.lineTo(-w / 2 + xPoint, -h / 2);
  context.lineTo(-w / 2 + 2 * xPoint, -h / 2 + yPoint);
  context.lineTo(-w / 2 + 2 * xPoint, -h / 2 + yPoint + shortSide);
  context.lineTo(-w / 2 + xPoint, -h / 2 + h);
  // console.log(`bottom point = ${-h/2 + 2*yPoint + shortSide}`)
  context.lineTo(-w / 2, -h / 2 + yPoint + shortSide);
  context.lineTo(-w / 2, -h / 2 + yPoint);
  context.stroke();
  context.restore();
};

class Space {
  constructor(map) {
    this.map = map;
    // TODO: ensure map has x and y, width and heigh
  }
  // eg,
  // {
  //   box: {
  //     x: 0,
  //     y: 0,
  //     width: width,
  //     height: height
  //   }
  // }

  grid(x, y) {
    // const gridArray = Array.from(Array(x * y))
    const gridArray = []; // TODO: make this a custom type that extends Array, then attach the hexagonise method to this object.
    // console.log(`this.map = ${JSON.stringify(this.map)}`);
    Array.from(Array(x), (_, xIndex) => {
      // console.log(`this.map = ${JSON.stringify(this.map)}`);
      Array.from(Array(y), (_, yIndex) => {
        const innerSpaceWidth = this.map.box.width / x;
        const innerSpaceHeight = this.map.box.height / y;
        gridArray.push(
          new Space({
            box: {
              x: this.map.box.x + innerSpaceWidth * xIndex,
              y: this.map.box.y + innerSpaceHeight * yIndex,
              width: this.map.box.width / x,
              height: this.map.box.height / y,
              row: yIndex,
              col: xIndex,
            },
          })
        );
      });
    });
    // console.log(`grid created: ${gridArray}`)
    // console.log(`first item of gridArray: ${gridArray[0]}`)
    return gridArray;
  }

  hexagonGrid(x, y) {
    // TODO: figure out the offset for each row of hexagons
    // TODO: make some assumptions about the hexagon size. See hexagon_grid.js for ideas. angle?
  }

  /**
   * calls the function passing in the x, y, width, and height of the objet it is attached
   * to. Also passes any additional parameters allowing you to change attributes based on
   * a time stamp for example.
   *
   * @param {Function} func The function to call on the space.
   * @param {...*} args Any additional arguments to be passed on
   */
  create(func, ...args) {
    console.log(`this.map = ${JSON.stringify(this.map)}`);
    if (this.map.box) {
      console.log(
        `draw from top left corner ${this.map.box.x}, ${this.map.box.y}, with width = ${this.map.box.width} and height = ${this.map.box.height}`
      );
      func(
        this.map.box.x,
        this.map.box.y,
        this.map.box.width,
        this.map.box.height,
        ...args
      );
    } else if (this.map.centroid) {
      console.log(
        `draw from center point ${this.map.centroid.x}, ${this.map.centroid.y}`
      );
      console.log("TODO: call func with parameters");
    }
  }
}

// const b = new Space('bla')
//
// console.log(`b.map = ${b.map}`)

module.exports = {
  Space,
  hexagonise,
  drawHexagon,
};

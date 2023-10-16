const hexInnerAngle = 120;
const hexExternalTriangleAccuteAngle = 90 - (hexInnerAngle/2)
const hexExternalTriangleAccuteAngleRad = hexExternalTriangleAccuteAngle*Math.PI/180
    
const hexagonise = (gridArray) => {
  const stretchFactor = 1.4
  gridArray.forEach(space => {
    space.map.box.y = space.map.box.y + space.map.box.height * (stretchFactor - 1) * space.map.box.row
    space.map.box.height = space.map.box.height * stretchFactor
  })
  // Assume that the hexagon has it's points virtically, not horizontally and that the flat sides 
  // are squished to fit it in the space (ie, angle is always 120 degrees)
  gridArray.forEach(space => {
    const xPoint = space.map.box.width / 2
    const yPoint = xPoint * Math.tan(hexExternalTriangleAccuteAngleRad)
    console.log(`space = ${JSON.stringify(space)}`);
    // TODO: offset the row by the row number times the y offset value
    space.map.box.y += -yPoint * space.map.box.row
    console.log(`new space.map.box.y = ${space.map.box.y}`);
    if (space.map.box.row % 2 != 0) {
      // TODO: row nubmer is odd, therefor also offset by the x avlue
      space.map.box.x += xPoint
      console.log(`new space.map.box.x = ${space.map.box.x}`);
    }
  })
}


class Space {
  constructor(map){
    this.map = map
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
    const gridArray = [] // TODO: make this a custom type that extends Array, then attach the hexagonise method to this object.
    console.log(`this.map = ${JSON.stringify(this.map)}`);
    Array.from(Array(x), (_, xIndex) => {
      console.log(`this.map = ${JSON.stringify(this.map)}`);
      Array.from(Array(y), (_, yIndex) => {
        const innerSpaceWidth = this.map.box.width / x;
        const innerSpaceHeight = this.map.box.height / y;
        gridArray.push(new Space({
          box: {
            x: this.map.box.x + innerSpaceWidth * xIndex,
            y: this.map.box.y + innerSpaceHeight * yIndex,
            width: this.map.box.width / x,
            height: this.map.box.height / y,
            row: yIndex,
            col: xIndex
          }
        }))
      })
    })
    // console.log(`grid created: ${gridArray}`)
    // console.log(`first item of gridArray: ${gridArray[0]}`)
    return gridArray
  }

  hexagonGrid(x, y) {
    // TODO: figure out the offset for each row of hexagons
    // TODO: make some assumptions about the hexagon size. See hexagon_grid.js for ideas. angle?
  }

  create(func, ...args) {
    console.log(`this.map = ${JSON.stringify(this.map)}`);
      if (this.map.box) {
        console.log(`draw from top left corner ${this.map.box.x}, ${this.map.box.y}, with width = ${this.map.box.width} and height = ${this.map.box.height}`)
        func(this.map.box.x, this.map.box.y, this.map.box.width, this.map.box.height, ...args)
      } else if (this.map.centroid) {
        console.log(`draw from center point ${this.map.centroid.x}, ${this.map.centroid.y}`)
        console.log("TODO: call func with parameters")
      }
    }
  }

// const b = new Space('bla')
// 
// console.log(`b.map = ${b.map}`)

module.exports = {
  Space,
  hexagonise
}

class Space {
  constructor(map){
    this.map = map
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
    const gridArray = []
    console.log(`this.map = ${JSON.stringify(this.map)}`);
    Array.from(Array(x), (_, xIndex) => {
      console.log(`this.map = ${JSON.stringify(this.map)}`);
      Array.from(Array(y), (_, yIndex) => {
        const innerSpaceWidth = this.map.box.width / x;
        const innerSpaceHeight = this.map.box.height / y;
        console.log(`TODO: create a space in ${xIndex}, ${yIndex} grid space`);
        gridArray.push(new Space({
          box: {
            x: this.map.box.x + innerSpaceWidth * xIndex,
            y: this.map.box.y + innerSpaceHeight * yIndex,
            width: this.map.box.width / x,
            height: this.map.box.height / y
          }
        }))
      })
    })
    // console.log(`grid created: ${gridArray}`)
    // console.log(`first item of gridArray: ${gridArray[0]}`)
    return gridArray
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
  Space 
}

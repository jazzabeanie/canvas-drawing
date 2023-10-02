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
}

// const b = new Space('bla')
// 
// console.log(`b.map = ${b.map}`)

module.exports = Space;

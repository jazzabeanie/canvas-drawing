const pencil = require("./pencilCase.js")

const a = new pencil({
      box: {
        x: 0,
        y: 0,
        width: 100,
        height: 100
      }
    })

console.log(`a.map = ${a.map}`)

const g = a.grid(2, 2)

console.log(`g =${g}`)

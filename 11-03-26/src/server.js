const express = require('express')
const app = express()
const port = 3000


let frutas = [

  { ID: 1, nome: "Laranja" }
  { ID: 2, nome: "Morango" }
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
  
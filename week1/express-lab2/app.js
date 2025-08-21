const express = require("express")
const app = express()


const {getRoot} = require("./controllers")

const port = 3001;

app.get("/", getRoot)


app.listen(port, () =>{
  console.log(`The server is running at http://localhost:${port}`);
})
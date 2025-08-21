const express = require("express")
const app = express()
const port = 3001;

const { getEndpoint1, getEndpoint2, getEndpoint3, getRoot } = require("./controllers");


app.get("/", getRoot);
app.get("/endpoint1", getEndpoint1);
app.get("/endpoint2", getEndpoint2);
app.get("/endpoint3", getEndpoint3);


app.listen(port, ()=>{
    console.log(`The server is running at http://localhost:${port}`);
})
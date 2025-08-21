const fs = require("fs")
const os = require("os")


fs.readFile("./sample.txt", "utf8", (err, data)=>{
    if (err){
        console.error("Error reading file:", err);

    }else{
        console.log("File contents:", data)
    }
})


fs.writeFile("./output.txt", "hello", (err) =>{
    if (err){
        console.error("Error writing file:", err)
    }else{
        console.log("Wrote file")
    }
})


console.log("Hostname:", os.hostname())
console.log("Platform:", os.platform())
console.log("CPU cores:", os.cpus())

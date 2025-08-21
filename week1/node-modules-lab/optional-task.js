const fs = require("fs").promises
const os = require("os")


const data = {
    "Hostname": os.hostname(),
    "Platform": os.platform(),
    "CPU cores": os.cpus()
}

async function logOs(){
    try{
        await fs.writeFile("./output.txt", JSON.stringify(data)) 
        console.log("Data wrote")
        
    }catch (error){
        console.error("Error:", error)
    }
}



logOs()
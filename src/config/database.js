const mongoose = require("mongoose")

async function connection(){
    const conn = await mongoose.connect("mongodb://mongo/myDB")
    console.log(conn)
    console.log("Connection established...")
}


module.exports = {mongoose,connection}
const mongoose = require("mongoose")

async function connection(){
    
    const conn = await mongoose.connect("mongodb+srv://tzuzul:b5XPUa5zkYhPeAJ6@backendadvancedabril202.aaldh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

    console.log("Connection established...")
    console.log(conn.connection.host)
}


module.exports = {mongoose,connection}
const express = require("express")
const { port } = require("./config")

// Importacion de rutas
const files = require("./routes/files")
const folders = require("./routes/folders")
const users = require("./routes/users")
const subscriptions = require("./routes/subscriptions")

const app = express()

// Usando middleware
app.use(express.json())

// uso de rutas
files(app)
folders(app)
users(app)
subscriptions(app)

app.get("/",(req,res)=>{
    return res.json({
        message:"Hola mundo"
    })
})


app.listen(port,()=>{
    console.log("Listening on: http://localhost:"+port)
})
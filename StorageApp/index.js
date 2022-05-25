const express = require("express")
const { port } = require("./config")

// Importacion de rutas
const files = require("./routes/files")

const app = express()

// uso de rutas
files(app)

app.get("/",(req,res)=>{
    return res.json({
        message:"Hola mundo"
    })
})


app.listen(port,()=>{
    console.log("Listening on: http://localhost:"+port)
})
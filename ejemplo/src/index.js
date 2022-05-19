const express = require("express")
const {connection} = require("./config/database")

const userModel = require("./models/user")

const app = express()

//Mongoose
// uri: mongodb://mongo/myDB

connection()


app.get("/",async (req,res)=>{
    const users = await userModel.find()
    return res.json(users)
})

app.get("/contacto",(req,res)=>{
    return res.json({
        nombre:"Tzuzul",
        correo:"mail@tzuzulcode.com",
        telefono:232323
    })
})


app.listen(4000,()=>{
    console.log("Escuchando en: http://localhost:4000")
})
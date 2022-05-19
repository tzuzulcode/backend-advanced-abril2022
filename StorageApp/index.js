const express = require("express")


const app = express()


app.get("/",(req,res)=>{
    return res.json({
        message:"Hola mundo"
    })
})


app.listen(4000,()=>{
    console.log("Listening on: http://localhost:"+4000)
})
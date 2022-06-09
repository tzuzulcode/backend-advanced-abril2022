const express = require("express")
const cors = require("cors")
const { port } = require("./config")

// Importacion de rutas
const files = require("./routes/files")
const folders = require("./routes/folders")
const users = require("./routes/users")
const subscriptions = require("./routes/subscriptions")
const webhooks = require("./routes/webhooks")

const app = express()

// Usando middleware
app.use(cors({
    origin:["http://localhost:3000"]
}))

app.use("/api/webhooks/stripe",express.raw({
    type:"application/json"
}))
app.use(express.json())

// uso de rutas
files(app)
folders(app)
users(app)
subscriptions(app)
webhooks(app)

app.get("/",(req,res)=>{
    return res.json({
        message:"Hola mundo"
    })
})


app.listen(port,()=>{
    console.log("Listening on: http://localhost:"+port)
})
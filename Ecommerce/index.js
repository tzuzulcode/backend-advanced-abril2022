// Tener una BD
// Configurar Prisma o Mongoose, o mysql2, mongoDb
// Configurar express

const express = require("express")
const graphql = require("./routes/graphql")
const apollo = require("./routes/apollo")
const auth = require("./routes/auth")




const app = express()

app.use(express.json())

// Usando routes
graphql(app)
apollo(app)
auth(app)

// app.get("/",async (req,res)=>{
//     const source = req.body.query
//     const result = await graphql({ schema, source, rootValue })

//     return res.send(result)
// })

app.listen(4000,()=>{
    console.log("Listening on: http://localhost:4000")
})
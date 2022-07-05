// Tener una BD
// Configurar Prisma o Mongoose, o mysql2, mongoDb
// Configurar express

const express = require("express")
const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
    hola:String
  }
`);

var rootValue = { hello: () => 'Hello world!',hola:()=>"Hola mundo" };



const app = express()

app.use(express.text())

app.get("/",async (req,res)=>{
    const source = req.body
    const result = await graphql({ schema, source, rootValue })

    return res.send(result)
})

app.listen(4000,()=>{
    console.log("Listening on: http://localhost:4000")
})
const { createServer } = require("@node-rpc/server");
const { jsonDeserializer } = require("@node-rpc/server/dist/deserializers/jsonDeserializer");

const express = require("express")

const api = {
    add:(a,b)=>()=>{
        return `${a+b}`
    },
    sub:(a,b)=>()=>{
        return `${a-b}`
    }
}


const rpcServer = createServer({
    api,
    deserializer: jsonDeserializer,
});



const app = express()

app.post("/calculator",async (req,res)=>{
    try {
        const result = await rpcServer.handleAPIRequest(req)
        console.log(result)
        return res.send(result);
    } catch (error) {
        console.log(error)
        return res.status(400).send("An error ocurred")
    }
})

app.listen(4000,()=>{
    console.log("Listening on: http://localhost:4000");
})
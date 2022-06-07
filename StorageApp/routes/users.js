const express = require("express")
const UserService = require("../services/users")

function users(app){
    const router = express.Router()
    const userServ = new UserService()

    app.use("/api/users",router)


    router.get("/",async (req,res)=>{
        const users = await userServ.getAll()

        return res.json(users)
    })

    router.post("/",async (req,res)=>{
        const user = await userServ.create(req.body)

        return res.json(user)
    })
    
    router.delete("/:id",async (req,res)=>{
        const user = await userServ.delete(req.params.id)

        return res.json(user)
    })
}


module.exports = users
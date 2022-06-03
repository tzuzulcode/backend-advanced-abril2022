const express = require("express")
const FolderServ = require("../services/folders")


function folders(app){
    const router = express.Router()
    const folderServ = new FolderServ()

    app.use("/api/folders",router)

    router.get("/myFolders",async (req,res)=>{
        const {idUser} = req.body

        const result = await folderServ.getMyFolders(idUser)

        return res.status(result.success?200:400).json(result)
    })

    router.get("/:id", async (req,res)=>{
        const {id} = req.params
        const {idUser} = req.body
        const result = await folderServ.getById(id,idUser)

        return res.status(result.success?200:400).json(result)
    })

    router.post("/",async (req,res)=>{
        const {idUser,name,parentFolderId} = req.body
        const result = await folderServ.create(name,idUser,parentFolderId)

        return res.status(result.success?200:400).json(result)

    })
}

module.exports = folders
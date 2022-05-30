const express = require("express")
const FilesService = require("../services/files")
const upload = require("../middleware/uploadFile")// Middleware de carga de archivos

function files(app){
    const router = express.Router()
    const filesServ = new FilesService()

    app.use("/api/files",router)


    router.post("/upload",upload.array("files"),async (req,res)=>{
        
        const results = await filesServ.uploadMany(req.files,req.body.id)

        return res.json(results)
    })
}

module.exports = files
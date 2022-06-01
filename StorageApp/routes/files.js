const express = require("express")
const FilesService = require("../services/files")
const upload = require("../middleware/uploadFile")// Middleware de carga de archivos

function files(app){
    const router = express.Router()
    const filesServ = new FilesService()

    app.use("/api/files",router)

    router.get("/",async (req,res)=>{
        const files = await filesServ.getAll()

        return res.json(files)
    })

    router.get("/:fileName",async (req,res)=>{
        const {fileName} = req.params

        const result = await filesServ.get(fileName,res)
        if(result.success){
            return res.end()
        }

        return res.status(404).json(result)
    })


    router.post("/upload",upload.array("files"),async (req,res)=>{
        
        const results = await filesServ.uploadMany(req.files,req.body.id)

        return res.status(200).json(results)
    })


    router.delete("/delete",async (req,res)=>{
        const {files} = req.body
        const result = await filesServ.deleteMany(files)

        return res.json(result)
    })
}

module.exports = files
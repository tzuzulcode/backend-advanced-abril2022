const express = require("express")
const FilesService = require("../services/files")
const upload = require("../middleware/uploadFile")// Middleware de carga de archivos

function files(app){
    const router = express.Router()

    app.use("/api/files",router)


    router.post("/upload",upload.array("files"),async (req,res)=>{
        
        const results = await uploadFiles(req.files)

        console.log(results)

        return res.json({
            success:true,
            message:"Upload successful"
        })
    })
}

module.exports = files
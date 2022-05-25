const express = require("express")
const uploadFiles = require("../libs/storage")
const uploadFile = require("../middleware/uploadFile")

function files(app){
    const router = express.Router()

    app.use("/api/files",router)


    router.post("/upload",uploadFile.array("files"),(req,res)=>{
        
        uploadFiles(req.files)

        return res.json({
            success:true,
            message:"Upload successful"
        })
    })
}

module.exports = files
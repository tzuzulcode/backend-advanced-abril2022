const {Storage} = require("@google-cloud/storage")
const uuid = require("uuid")
const path = require("path")
const {Readable} = require("stream")
const { bucketName } = require("../config")

const storage = new Storage({
    keyFilename:"credentials.json"
})

const uploadFile = (file)=>{
    if(!file){
        return {
            success:false,
            message:"A file is necessary"
        }
    }
    const ext = path.extname(file.originalname)
    const fileName = uuid.v4()+ext
    const cloudFile = storage.bucket(bucketName).file(fileName) // Referencia al archivo en la nube
    const fileStream = Readable.from(file.buffer)


    return new Promise((resolve,reject)=>{
        fileStream.pipe(cloudFile.createWriteStream())
        .on("finish",()=>{
            resolve({
                success:true,
                message:"File uploaded succesfully",
                originalName:file.originalname,
                fileName
            })
        })
        .on("error",(err)=>{
            console.log(err)
            reject({
                success:false,
                message:"An error ocurred"
            })
        })
    })
}

const uploadFiles = async (files)=>{
    const promises = files.map(file=>uploadFile(file))
    const results = await Promise.allSettled(promises)

    return results
}


module.exports = {
    uploadFile,
    uploadFiles
}

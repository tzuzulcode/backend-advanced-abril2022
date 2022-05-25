const {Storage} = require("@google-cloud/storage")
const uuid = require("uuid")
const path = require("path")
const {Readable} = require("stream")
const { bucketName } = require("../config")

const storage = new Storage({
    keyFilename:"credentials.json"
})

const uploadFiles = (files)=>{
    files.forEach(file=>{
        const ext = path.extname(file.originalname)
        const fileName = uuid.v4()+ext
        const cloudFile = storage.bucket(bucketName).file(fileName) // Referencia al archivo en la nube
        const fileStream = Readable.from(file.buffer)

        fileStream.pipe(cloudFile.createWriteStream())
        .on("finish",()=>{
            console.log("Upload finish")
        })
        .on("error",(err)=>{
            console.log(err)
        })
    })
}


module.exports = uploadFiles

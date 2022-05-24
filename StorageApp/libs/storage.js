const {Storage} = require("@google-cloud/storage")
const { bucketName } = require("../config")

const storage = new Storage({
    keyFilename:"credentials.json"
})

const file = storage.bucket(bucketName).file("img.jpg") // Referencia al archivo en la nube

// originalFile es el readableStream
originalFile.pipe(file.createWriteStream())
// Revisar los streams

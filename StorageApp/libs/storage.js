const {Storage} = require("@google-cloud/storage")

const storage = new Storage({
    keyFilename:"credentials.json"
})

const file = storage.bucket("tzuzulcode").file("img.jpg") // Referencia al archivo en la nube

originalFile.pipe(file.createWriteStream())
// Revisar los streams

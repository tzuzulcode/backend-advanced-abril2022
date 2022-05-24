require("dotenv").config() // Cargar las variables de entorno del .env

const config = {
    bucketName:process.env.BUCKET_NAME
}

module.exports = config
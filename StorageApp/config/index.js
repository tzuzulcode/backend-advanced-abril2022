require("dotenv").config() // Cargar las variables de entorno del .env

const config = {
    port:process.env.PORT,
    bucketName:process.env.BUCKET_NAME
}

module.exports = config
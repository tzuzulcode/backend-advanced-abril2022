require("dotenv").config() // Cargar las variables de entorno del .env

const config = {
    name:process.env.NAME
}

console.log(process.env.NAME)

module.exports = config
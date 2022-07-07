const {PrismaClient} = require("@prisma/client")
const path = require("path")

const envFile = path.join(__dirname,"..",`.env.${process.env.NODE_ENV}`)

require("dotenv").config({
    path:envFile
})

console.log("Loaded env from:",envFile)


const client = new PrismaClient()

module.exports = client
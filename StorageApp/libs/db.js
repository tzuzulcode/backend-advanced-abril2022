const {PrismaClient} = require("@prisma/client")
require("dotenv").config({
    // path:`.env.${process.env.NODE_ENV}`,
    path:`.env.production`,
    // override:true
})

console.log(process.env.NODE_ENV)

const client = new PrismaClient()

module.exports = client
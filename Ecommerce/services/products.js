const prisma = require("../libs/db")

class Products{
    async getAll(){
        const products = await prisma.product.findMany()

        return products
    }

    async getByID(id){
        const product = await prisma.product.findUnique({
            where:{
                id
            }
        })

        return product
    }

    async create(data){
        const product = await prisma.product.create({
            data
        })

        return product
    }

    async deleteAll(){
        await prisma.product.deleteMany()
    }
}

module.exports = Products
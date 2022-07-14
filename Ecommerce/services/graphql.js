const ProductsService = require("./products")
const productsServ = new ProductsService()
const {GraphQLError} = require("graphql")
const {schema} = require("../graphql/schema")

const rootValue = {
    products: productsServ.getAll,
    createProduct: async (data)=>await productsServ.create(data.product),
    product:async(data,context)=>{
        const {logged,user} = context
        if(logged && user.role==="REGULAR"){
            return await productsServ.getByID(data.id)
        }

        return new GraphQLError("Not allowed")
    },
    hello:()=>{return "Hello world!!"}
}

module.exports = {
    schema,
    rootValue
}
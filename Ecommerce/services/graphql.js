const {buildSchema} = require("graphql")
const ProductsService = require("./products")
const productsServ = new ProductsService()

const rootValue = {
    products: productsServ.getAll,
    hello:()=>{return "Hello world!!"}
}

const schema = buildSchema(`
    type Query{
        hello:String
        products:[Product]
    }

    type Product{
        id:Int
        name:String
        description:String
        price:Float
    }
`)

module.exports = {
    schema,
    rootValue
}
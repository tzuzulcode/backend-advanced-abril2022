const {buildSchema} = require("graphql")
const ProductsService = require("./products")
const productsServ = new ProductsService()

const rootValue = {
    products: productsServ.getAll,
    createProduct: async (data)=>await productsServ.create(data.product),
    product:async(data)=>{
        console.log(data)
    },
    hello:()=>{return "Hello world!!"}
}

const schema = buildSchema(`
    type Query{
        hello:String
        products:[Product]
        product(id:Int!):Product
    }

    type Product{
        id:Int
        name:String
        description:String
        price:Float
    }

    input ProductInput{
        id:Int
        name:String
        description:String
        price:Float
    }

    type Mutation{
        createProduct(product:ProductInput!): Product
    }
`)

module.exports = {
    schema,
    rootValue
}
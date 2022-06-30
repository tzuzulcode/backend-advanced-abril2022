const productsProto = require("../protos/products")

const productsService = productsProto.Products.service

const methods = {
    addProduct(product){
        console.log(product)
        return {
            value:"abc123"
        }
    },
    getProduct(id){
        console.log(id)
        return {
            id:"abc123",
            name:"Producto 1",
            description:"Descripción del producto"
        }
    }
}

module.exports = {
    productsService,
    methods
}
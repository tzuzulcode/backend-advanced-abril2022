// Generación dinámica
// const productsProto = require("../protos/products")
// const productsService = productsProto.Products.service

// Generación estática
const messages = require('../Products_pb');
const services = require('../Products_grpc_pb');
const productsService = services.ProductsService

const methods = {
    addProduct(request,response){
        const idProduct = request.request.getValue()
        console.log(idProduct)
        // response(error,result)
        response(null,{
            value:"abc123"
        })
    },
    getProduct(request,response){
        console.log("idProduct",request.request.getValue())
        const product = new messages.Product()
        console.log("Product",product)
        product.setId("abc123")
        product.setName("Producto 1") 
        product.setDescription("Descripción del producto")

        // Dinámico
        // response(null,{
        //     id:"abc123",
        //     name:"Producto 1",
        //     description:"Descripción del producto"
        // })


        // Estático
        response(null, product)
    }
}

module.exports = {
    productsService,
    methods
}
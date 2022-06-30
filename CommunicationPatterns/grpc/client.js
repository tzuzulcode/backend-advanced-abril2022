const grpc = require("@grpc/grpc-js")
// const productsProto = require("./protos/products")

// const client = new productsProto.Products("localhost:4000",grpc.credentials.createInsecure())

const productsProto = require("./Products_grpc_pb").ProductsClient

const client = new productsProto("localhost:4000",grpc.credentials.createInsecure())
console.log(client)

const idProduct = {
    value:"abc123"
}

console.log(client.getProduct(idProduct))
const grpc = require("@grpc/grpc-js")
// Generación dinámica:
// const productsProto = require("./protos/products")

// const client = new productsProto.Products("localhost:4000",grpc.credentials.createInsecure())
// const idProduct = {
//     value:"abc123"
// }


// Generación estática:
const messages = require("./Products_pb")
const services = require("./Products_grpc_pb")

const client = new services.ProductsClient("localhost:4000",grpc.credentials.createInsecure())

const idProduct = new messages.ProductID()
idProduct.setValue("abc123")

client.getProduct(
    idProduct,
    (err,result)=>{
        console.log(err)
        console.log(result.getId())
    }
)
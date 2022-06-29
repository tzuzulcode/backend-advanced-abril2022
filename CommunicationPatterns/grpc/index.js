const grpc = require('@grpc/grpc-js');
const {productsService,methods} = require("./services/products")

const server = new grpc.Server()

server.addService(productsService, methods);

server.bindAsync("0.0.0.0:4000",grpc.ServerCredentials.createInsecure(),(error) => {
    if(error){
        console.log(error)
    }else{
        console.log("Listening on: http://localhost:4000")
        server.start();
    }
})
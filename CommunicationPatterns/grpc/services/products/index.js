const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require("path")
const protoPath = path.join(__dirname,"..","..","Products.proto")
console.log(protoPath)
const methods = require("./methods")

const packageDefinition = protoLoader.loadSync(
    protoPath,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

const productsService = protoDescriptor.ecommerce.Products.service

module.exports = {
    productsService,
    methods
}
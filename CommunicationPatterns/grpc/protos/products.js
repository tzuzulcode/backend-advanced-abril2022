const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require("path")
const protoPath = path.join(__dirname,"..","Products.proto")
console.log(protoPath)

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

const {ecommerce} = grpc.loadPackageDefinition(packageDefinition)

module.exports = ecommerce
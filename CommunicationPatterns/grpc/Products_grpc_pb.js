// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var Products_pb = require('./Products_pb.js');

function serialize_ecommerce_Product(arg) {
  if (!(arg instanceof Products_pb.Product)) {
    throw new Error('Expected argument of type ecommerce.Product');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ecommerce_Product(buffer_arg) {
  return Products_pb.Product.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ecommerce_ProductID(arg) {
  if (!(arg instanceof Products_pb.ProductID)) {
    throw new Error('Expected argument of type ecommerce.ProductID');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ecommerce_ProductID(buffer_arg) {
  return Products_pb.ProductID.deserializeBinary(new Uint8Array(buffer_arg));
}


var ProductsService = exports.ProductsService = {
  addProduct: {
    path: '/ecommerce.Products/addProduct',
    requestStream: false,
    responseStream: false,
    requestType: Products_pb.Product,
    responseType: Products_pb.ProductID,
    requestSerialize: serialize_ecommerce_Product,
    requestDeserialize: deserialize_ecommerce_Product,
    responseSerialize: serialize_ecommerce_ProductID,
    responseDeserialize: deserialize_ecommerce_ProductID,
  },
  getProduct: {
    path: '/ecommerce.Products/getProduct',
    requestStream: false,
    responseStream: false,
    requestType: Products_pb.ProductID,
    responseType: Products_pb.Product,
    requestSerialize: serialize_ecommerce_ProductID,
    requestDeserialize: deserialize_ecommerce_ProductID,
    responseSerialize: serialize_ecommerce_Product,
    responseDeserialize: deserialize_ecommerce_Product,
  },
};

exports.ProductsClient = grpc.makeGenericClientConstructor(ProductsService);

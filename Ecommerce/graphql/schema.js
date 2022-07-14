const path = require("path")
const {loadSchemaSync,loadDocumentsSync} = require("@graphql-tools/load")
const {GraphQLFileLoader} = require("@graphql-tools/graphql-file-loader")
// const {addResolversToSchema} = require("@graphql-tools/schema")

// const schema = addResolversToSchema({
//     schema:loadSchemaSync(path.join(__dirname,"schema.graphql"),{
//         loaders:[new GraphQLFileLoader()]
//     }),
//     resolvers:{}
// })

const schema = loadSchemaSync(path.join(__dirname,"schema.graphql"),{
    loaders:[new GraphQLFileLoader()]
})

// const typeDefs = loadDocumentsSync(path.join(__dirname,"schema.graphql"),{
//     loaders:[new GraphQLFileLoader()]
// })

const typeDefs = schema

module.exports = {schema,typeDefs}
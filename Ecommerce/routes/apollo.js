const {ApolloServer} = require("apollo-server-express")
const {typeDefs,resolvers,getContext} = require("../services/apollo")

async function apollo(app){
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context:getContext
    });

    try {
        await server.start()
        server.applyMiddleware({
            app,
            path:"/apollo"
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = apollo
const {graphqlHTTP} = require("express-graphql")
const {schema,rootValue} = require("../services/graphql")

function graphql(app){
    app.use("/graphql",graphqlHTTP((req,res,params)=>{
        return {
            graphiql:true,
            rootValue,
            schema,
            // context
        }
    }))
}

module.exports = graphql
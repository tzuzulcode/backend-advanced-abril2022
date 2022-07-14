const graphQLServer = require("../graphql")

function graphql(app){
    app.use("/graphql",graphQLServer)
}

module.exports = graphql
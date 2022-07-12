const {graphqlHTTP} = require("express-graphql")
const {schema,rootValue} = require("../services/graphql")
const AuthService = require("../services/auth")
const authServ = new AuthService()

function graphql(app){
    app.use("/graphql",graphqlHTTP(async (req,res,params)=>{
        const bearer = req.headers.authorization
        let context,token
        if(bearer){
            token = bearer.split(" ")[1]
        }
        if(token){
            const {data:user} = await authServ.validate(token)
            context = {
                logged:true,
                user
            }
        }else{
            context={
                logged:false
            }
        }
        return {
            graphiql:true,
            rootValue,
            schema,
            context
        }
    }))
}

module.exports = graphql
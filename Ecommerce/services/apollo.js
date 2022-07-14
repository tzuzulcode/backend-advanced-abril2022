const ProductsService = require("./products")
const productsServ = new ProductsService()
const {typeDefs} = require("../graphql/schema")
const AuthService = require("./auth")
const authServ = new AuthService()
const {AuthenticationError} = require("apollo-server-express")

const resolvers = {
    Query:{
        products: productsServ.getAll,
        product:async(parent, args, context, info)=>{
            const {logged,user} = context
            if(logged && user.role==="REGULAR"){
                return await productsServ.getByID(args.id)
            }
    
            return new AuthenticationError("Not allowed")
        },
        hello:()=>{return "Hello world!!"}
    },
    Mutation:{
        createProduct: async (parent, args, context, info)=>await productsServ.create(args.product),
    }
}

const getContext = async ({req})=>{
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

    return context
}


module.exports = {
    resolvers,
    typeDefs,
    getContext
}

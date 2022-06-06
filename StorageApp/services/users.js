const { stripeSecretKey } = require("../config")
const client = require("../libs/db")
const stripe = require("stripe")(stripeSecretKey)

class Users{
    async getAll(){
        const users = await client.user.findMany()

        return users
    }

    async create(data){
        try {
            const customer = await stripe.customers.create({
                email:data.email,
                name:data.name
            })
            const user = await client.user.create({
                data:{
                    name:data.name,
                    email:data.email,
                    password:data.password,
                    active:true,
                    subscription:{
                        create:{
                            stripeCustomerId:customer.id
                        }
                    }
                }
            })
    
            return user
        } catch (error) {
            console.log(error)

            return {error}
        }
    }
}

module.exports = Users
const client = require("../libs/db")

class Users{
    async getAll(){
        const users = await client.user.findMany()

        return users
    }

    async create(data){
        try {
            const user = await client.user.create({
                data:{
                    name:data.name,
                    email:data.email,
                    password:data.password,
                    active:true
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
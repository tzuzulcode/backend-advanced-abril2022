const jwt = require("jsonwebtoken")

class Auth{
    async login(data){
        const {email,password} = data
        // Consulta a BD
        const token = jwt.sign({email,role:"REGULAR"},"12345abc")

        return {
            success:true,
            user:{
                email,
                role:"REGULAR"
            },
            token
        }
    }

    async validate(token){
        try {
            const data = jwt.verify(token,"12345abc")
            return {
                success:true,
                data
            }
        } catch (error) {
            console.log(error)
            return {
                success:false,
                message:"An error ocurred"
            }
        }

    }
}

module.exports = Auth
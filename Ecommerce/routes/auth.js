const {Router} = require("express")
const AuthService = require("../services/auth")

function auth(app){
    const router = Router()
    const authServ = new AuthService()

    app.use("/api/auth",router)

    router.post("/login",async (req,res)=>{
        const result = await authServ.login(req.body)
        return res.json(result)
    })
}

module.exports = auth
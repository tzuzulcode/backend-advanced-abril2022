const Chai = require("chai")
const { isType } = require("graphql")
const expect = Chai.expect
const AuthService = require("../services/auth")


describe('Auth',function(){
    this.timeout(6000)
    let authServ
    before(async ()=>{
        authServ = new AuthService()
    })

    it("Should get a token",async ()=>{
        const result = await authServ.login({
            email:"mail@tzuzulcode.com",
            password:"12345"
        })

        expect(result.success).to.be.equal(true)
        expect(result.token).match(/^[\w-]+\.[\w-]+\.[\w-]+$/)
    })
})
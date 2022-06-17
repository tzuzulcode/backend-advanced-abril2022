const Chai = require("chai")
const expect = Chai.expect
const client = require("../libs/db")

describe('Users',function(){
    this.timeout(6000)
    it('Should be empty', async function(){
        const users = await client.user.findMany({
            include:{
                subscription:true
            }
        })

        console.log(users)

        expect(users).be.a("array")
        expect(users.length).equal(0)
    })
})
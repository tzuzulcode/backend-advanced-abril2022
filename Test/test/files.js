const Chai = require("chai")
const assert = Chai.assert
const expect = Chai.expect
Chai.should()

const {createFile} = require("../index")

describe('Files',function(){
    this.timeout(6000)
    it('should successfully create the file', async function(){
        try{
            const file = await createFile("miarchivo.txt","file.txt")
            // assert.exists(file)
            // assert.isObject(file)
            // assert.equal(file.success,true)
            // assert.match(file.message,/File created successfully/)
            // file.should.exist
            // file.should.be.a("object")
            // file.success.should.equal(true)
            // file.message.should.match(/File created successfully/)
            expect(file).exist
            expect(file).be.a("object")
            expect(file.success).equal(true)
            expect(file.message).match(/File created successfully/)
        }catch(error){
            console.log(error)

            throw error
        }
    })
})
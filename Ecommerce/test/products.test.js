const Chai = require("chai")
const expect = Chai.expect
const ProductsService = require("../services/products")
const productsServ = new ProductsService()

describe('Products',function(){
    this.timeout(6000)
    it("Should products be empty", async ()=>{
        const products = await productsServ.getAll()
        expect(products).be.a("array")
        expect(products.length).equal(0)
    })
    it("Should create a product",async ()=>{
        const product = await productsServ.create()

        expect(product).be.a("object")
    })
    it('Should get all products', async function(){
        
        const products = await productsServ.getAll()

        expect(products).be.a("array")
        expect(users.length).not.equal(0)
    })
})
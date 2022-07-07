const Chai = require("chai")
const expect = Chai.expect
const ProductsService = require("../services/products")


describe('Products',function(){
    this.timeout(6000)
    let productsServ
    before(async ()=>{
        productsServ = new ProductsService()
        await productsServ.deleteAll()
    })
    it("Should products be empty", async ()=>{
        const products = await productsServ.getAll()
        expect(products).be.a("array")
        expect(products.length).equal(0)
    })

    it("Should create a product",async ()=>{
        const product = await productsServ.create({
            name:"Producto test",
            price:100.5,
            description:"Descripción del producto"
        })

        expect(product).be.a("object")
    })
    it('Should get all products', async function(){
        
        const products = await productsServ.getAll()

        expect(products).be.a("array")
        expect(products.length).not.equal(0)
    })
})
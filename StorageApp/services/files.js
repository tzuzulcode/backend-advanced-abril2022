const {uploadFiles} = require("../libs/storage")
const {PrismaClient} = require("@prisma/client")

const client = new PrismaClient()

class Files{
    async uploadMany(files){
        const results = await uploadFiles(files)

        results.forEach(async (file)=>{
            if(file.value.success){
                const result = await client.file.create({
                    data:{
                        originalName:file.value.originalName,
                        name:file.value.fileName
                    }
                })
                // Agregar el dueño
    
                console.log(result)
            }

        })
    }
}

module.exports = Files
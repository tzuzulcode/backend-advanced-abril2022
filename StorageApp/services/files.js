const {uploadFiles} = require("../libs/storage")
const {PrismaClient} = require("@prisma/client")

const client = new PrismaClient()

class Files{
    async uploadMany(files,idUser){
        const results = await uploadFiles(files)

        const uploadedFiles = results.map(async (file)=>{
            if(file.value.success){
                const result = await client.file.create({
                    data:{
                        originalName:file.value.originalName,
                        name:file.value.fileName,
                        // ownerId:idUser
                        owner:{
                            connect:{
                                id: Number.parseInt(idUser)
                            }
                        }
                    }
                })
                
                return {
                    success:true,
                    file:result
                }
            }else{
                return{
                    success:false,
                    message:"An error ocurred"
                }
            }

        })

        return await (await Promise.allSettled(uploadedFiles)).map(result=>result.value)
    }
}

module.exports = Files
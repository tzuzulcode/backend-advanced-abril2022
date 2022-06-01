const {uploadFiles,deleteFile, downloadFile} = require("../libs/storage")
const {PrismaClient} = require("@prisma/client")

const client = new PrismaClient()

class Files{

    async getAll(){
        const files = await client.file.findMany()

        return files
    }

    async get(fileName,res){
        const file = await client.file.findUnique({
            where:{
                name:fileName
            }
        })

        if(file){
            return await downloadFile(fileName,res)
        }


        return {
            success:false,
            message:"File not found"
        }
    }

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


    async deleteMany(files){
        const resultPromises = files.map(async (file)=>{
            const result = await deleteFile(file)
            if(result.success){
                try {
                    const deletedFile = await client.file.delete({
                        where:{
                            name:result.fileName
                        }
                    })
    
                    return {
                        success:true,
                        file:deletedFile
                    }
                } catch (error) {
                    return {
                        success:false,
                        message: "File deleted. DB error"
                    }
                }
            }else{
                return result
            }
        })

        return await (await Promise.allSettled(resultPromises)).map(result=>{
            console.log(result)
            
            return result.value
        })
    }
}

module.exports = Files
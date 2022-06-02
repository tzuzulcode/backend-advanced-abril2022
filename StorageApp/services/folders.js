const client = require("../libs/db")

class Folders{

    async getMyFolders(ownerId){
        try {
            const folders = await client.folder.findMany({
                where:{
                    parentFolderId:null,
                    ownerId
                }
            })

            const files = await client.file.findMany({
                where:{
                    folderId:null,
                    ownerId
                }
            })

            return {
                success:true,
                folders,
                files
            }
        } catch (error) {
            console.log(error)

            return {
                success:false
            }
        }
    }

    async create(name,ownerId,parentFolderId){
        let data
        if(parentFolderId){
            data = {
                name,
                owner:{
                    connect:{
                        id:ownerId
                    }
                },
                parentFolder:{
                    connect:{
                        id:parentFolderId
                    }
                }
            }
        }else{
            data = {
                name,
                owner:{
                    connect:{
                        id:ownerId
                    }
                }
            }
        }
        try {
            const folder = await client.folder.create({
                data
            })
            return {
                success:true,
                folder
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

module.exports = Folders
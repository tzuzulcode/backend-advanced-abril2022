const fs = require("fs")

const deleteFile = (filename,callback)=>{
    fs.stat(filename,(err,stats)=>{
        if(err){
            callback(new Error(`the file ${filename} does not exist`))
        }else{
            fs.unlink(filename,(err)=>{
                if(err){
                    callback(new Error(`could not ${filename}`))
                }else{
                    callback()
                }
            })
        }
    })
}

const createFile = (fileName,file)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve({
                success:true,
                message:"File created successfully"
            })
        },5000)
    })
}

module.exports = {
    createFile,
    deleteFile
}
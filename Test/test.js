const assert = require("assert")
const deleteFile = require("./index")

// ELiminar un archivo que no existe
deleteFile("no-existe",(err,result)=>{
    assert.ok(err) // Verificamos si existe el error
    assert.ok(err instanceof Error) // Verificamos que sea realmente un error
    assert.match(err.message,/does not exist/)
})
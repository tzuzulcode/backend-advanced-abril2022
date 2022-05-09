const {mongoose} = require("../config/database")

const userSchema = new mongoose.Schema({
    name:String,
    email:String
})


const userModel = mongoose.model("users",userSchema)

module.exports = userModel
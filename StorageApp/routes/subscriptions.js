const express = require("express")

function subscriptions(app){
    const router = express.Router()

    app.use("/api/subscriptions",router)
}


module.exports = subscriptions

const express = require("express")
const SubscriptionService = require("../services/subscriptions")

function subscriptions(app){
    const router = express.Router()
    const subscriptionServ = new SubscriptionService()

    app.use("/api/subscriptions",router)

    router.post("/create",async (req,res)=>{
        const {customerID,priceID} = req.body

        const result = await subscriptionServ.createSubscription(customerID,priceID)

        return res.json(result)
    })
}


module.exports = subscriptions

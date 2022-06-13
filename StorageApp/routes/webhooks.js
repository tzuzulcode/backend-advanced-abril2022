const {Router} = require("express")
const SubscriptionService = require("../services/subscriptions")

function webhooks(app){
    const router = Router()
    const subscriptionsServ = new SubscriptionService()
    
    app.use("/api/webhooks",router)

    router.post("/stripe",async (req,res)=>{
        const sig = req.headers['stripe-signature'];

        const {success,message} = await subscriptionsServ.stripeWebhook(req.body,sig)

        return res.status(success?200:400).send(message)
    })
    router.post("/paypal",async (req,res)=>{
        // const sig = req.headers['stripe-signature'];

        console.log(req.body)

        return res.status(200).send("OK")
    })

}

module.exports = webhooks
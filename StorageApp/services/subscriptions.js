const paypalClient = require("../libs/paypalClient")
const { stripeSecretKey } = require("../config");
const client = require("../libs/db")
const stripe = require("stripe")(stripeSecretKey)
const endpointSecret = "whsec_2d849de04e6aa72abd49bf02b669777334504a448b75a97e166203f8fb714ffe";

class Subscription{
    async createSubscription(customerID,priceID){
        const subscription = await stripe.subscriptions.create({
            customer:customerID,
            items:[
                {
                    price:priceID
                }
            ],
            payment_behavior:'default_incomplete',
            expand:['latest_invoice.payment_intent']
        })

        return {
            succes:true,
            subscriptionID: subscription.id,
            clientSecret: subscription.latest_invoice.payment_intent.client_secret
        }
    }

    

    async activateSubscription(idCustomer,subscriptionId,type){
        const user = await client.subscription.update({
            where:{
                stripeCustomerId:idCustomer
            },
            data:{
                type:"PREMIUM",
                stripeSubscriptionId:subscriptionId
            }
        })

        return user
    }

    async stripeWebhook(data,signature){
        let event
        try {
            event = stripe.webhooks.constructEvent(data, signature, endpointSecret);
        } catch (err) {
            console.log(err)
            return {
                success:false,
                message:err.message
            }
        }

        switch (event.type) {
            case 'invoice.payment_succeeded':
                const paymentIntent = event.data.object;
                console.log(paymentIntent)
                break;
            case 'customer.subscription.updated':
                const subscriptionUpdated = event.data.object
                if(subscriptionUpdated.status==="active"){
                    const user = await this.activateSubscription(
                        subscriptionUpdated.customer,
                        subscriptionUpdated.id
                    )
                    console.log(user)
                }
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }


        return {
            success:true,
            message:"OK"
        }
        
    }
}


module.exports = Subscription
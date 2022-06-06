const { stripeSecretKey } = require("../config");

const stripe = require("stripe")(stripeSecretKey)

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
}


module.exports = Subscription
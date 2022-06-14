const paypalClient = require("../libs/paypalClient")
const { stripeSecretKey, paypalPublicKey, paypalSecretKey } = require("../config");
const client = require("../libs/db")
const stripe = require("stripe")(stripeSecretKey)
const endpointSecret = "whsec_2d849de04e6aa72abd49bf02b669777334504a448b75a97e166203f8fb714ffe";
const url = require("url")

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

    async createSubscriptionPayPal(idUser,planID){

        try {
            const params = new url.URLSearchParams({
                grant_type:"client_credentials"
            })
            console.log(params.toString())
            const {data:{access_token}} = await paypalClient.post("/v1/oauth2/token","grant_type=client_credentials",{
                auth:{
                    username:paypalPublicKey,
                    password:paypalSecretKey
                }
            })
            const response = await paypalClient.post("/v1/billing/subscriptions",{
                'plan_id':planID
            },{
                headers:{
                    "Authorization":"Bearer "+access_token
                }
            })
            const subscription = response.data
            console.log(subscription)
            const result = await client.subscription.update({
                where:{
                    userID:idUser
                },
                data:{
                    paypalSubscriptionId:subscription.id
                }
            })

            return {
                success:true,
                subscription
            }
        } catch (error) {
            console.log(error)
            return {
                success:false,
                message:"Ocurrió un error, intenta mas tarde"
            }
        }
        

        return response.data
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
    async activateSubscriptionPayPal(subscriptionId,type){
        const user = await client.subscription.updateMany({
            where:{
                paypalSubscriptionId:subscriptionId
            },
            data:{
                type:"PREMIUM",
                paypalSubscriptionId:subscriptionId
            }
        })
        console.log(user)

        return user[0]
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

    async paypalWebhook(data){
        switch (data.event_type) {
            case 'BILLING.SUBSCRIPTION.ACTIVATED':
                console.log(data.resource.status)
                if(data.resource.status==="ACTIVE"){
                    const user = await this.activateSubscriptionPayPal(
                        data.resource.id
                    )
                }
                break;
        
            default:
                console.log(`Unhandled event type ${data.event_type}`);
                break;
        }
    }
}


module.exports = Subscription
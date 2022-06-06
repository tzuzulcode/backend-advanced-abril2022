require("dotenv").config() // Cargar las variables de entorno del .env

const config = {
    port:process.env.PORT,
    bucketName:process.env.BUCKET_NAME,
    stripePublicKey:process.env.STRIPE_PUBLIC_KEY,
    stripeSecretKey:process.env.STRIPE_SECRET_KEY,
    paypalPublicKey:process.env.PAYPAL_PUBLIC_KEY,
    paypalSecretKey:process.env.PAYPAL_SECRET_KEY
}

module.exports = config
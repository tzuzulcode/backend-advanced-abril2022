require("dotenv").config({
    // path:`.env.${process.env.NODE_ENV}`,
    path:`.env.production`,
}) // Cargar las variables de entorno del .env

const config = {
    port:process.env.PORT,
    bucketName:process.env.BUCKET_NAME,
    stripePublicKey:process.env.STRIPE_PUBLIC_KEY,
    stripeSecretKey:process.env.STRIPE_SECRET_KEY,
    paypalPublicKey:process.env.PAYPAL_PUBLIC_KEY,
    paypalSecretKey:process.env.PAYPAL_SECRET_KEY,
    paypalApiUrl: process.env.PAYPAL_API_URL
}

module.exports = config
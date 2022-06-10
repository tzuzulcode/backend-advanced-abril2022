const { paypalApiUrl } = require("../config")

const axios = require("axios").default

const client = axios.create({
    baseURL:paypalApiUrl
})

module.exports = client
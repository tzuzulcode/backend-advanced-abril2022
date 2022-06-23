const axios = require("axios").default
const parseString = require("xml2js").parseString

const xmlToJSON = (string)=>{
    return new Promise((resolve,reject)=>{
        parseString(string,{trim:true,explicitArray:false,explicitRoot:false},(err,result)=>{
            if(err){
                reject(err)
            }
            resolve(result)
        })
    })
}

async function soapRequest(url,body){
    try {
        const response = await axios.post(url,
        `<?xml version="1.0" encoding="utf-8"?>
            <soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
                <soap12:Body>
                    ${body}
                </soap12:Body>
            </soap12:Envelope>
        `,{
            headers:{
                "Accept":"*/*",
                "Content-Type":"text/xml; charset=utf-8"
            }
        })
    
        const json = await xmlToJSON(response.data)
        const responseBody = json["soap:Body"]
        return {
            success:true,
            data: responseBody
        }
    } catch (error) {
        console.log(error)
        return {
            success:false,
            message:"An error ocurred"
        }
    }
}

module.exports = soapRequest
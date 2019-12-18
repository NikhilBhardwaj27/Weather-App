const request = require('request')

const forecast = (longitude,latitude,callback) => {
    const url = `https://api.darksky.net/forecast/2d4e21928385c0f39903e846df3b066d/${longitude},${latitude}?units=si`

    request({url:url,json:true},(error,response)=>{

        if(error){
            callback(error,undefined)
        }else if(response.body.error){
            callback(response.body.error,undefined)
        }else{
            callback(undefined,{temperature:response.body.currently.temperature,summary:response.body.currently.summary})
        }
    })

}

module.exports = forecast
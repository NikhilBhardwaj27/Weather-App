const request = require('request')


const geocodeUrl = (city,callback) => {

    const geoCodeUrl =  `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoibmlrMjcxMiIsImEiOiJjazQ1ZDduankwN2tjM29teTBhNmxkOHhkIn0._oAfpEPnTWTUfL1KXUJDgg&limit=1`
    
    request({url: geoCodeUrl,json:true},(error,response)=>{
        if(error){
            callback('Error occured '+error,undefined)
        }else if(response.body.features.length === 0){
            callback({"error":"Unable to find Location"},undefined)
        }else {    
            callback(undefined,{
                longitude:response.body.features[0].center[1],
                latitude:response.body.features[0].center[0],
                location:response.body.features[0].text
            })
        }
    })
}

module.exports = geocodeUrl
const axios= require("axios");

const forecast = (location, callback)=>{
    const API_URL="http://api.weatherstack.com/current?access_key=7d5e334f8f9a4a0fcd81c1b27a8f89d3&query="+location;
    console.log(API_URL)
    axios.get(API_URL).then(response=>{
        if(response.data.error) callback('Unable to find location', undefined)
        else callback( undefined, 'The city ' +response.data.location.name+' is having a weather like '+response.data.current.weather_descriptions[0])
    }).catch(error=>{
        callback(undefined, 'Unable to connect to weather service!')
    })

}

module.exports = forecast

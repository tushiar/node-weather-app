const axios = require('axios')

const geocode = (address, callback) => {
    const API_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidHVzaGlhciIsImEiOiJja3FveDg5N2gwOGF5MnhvMTU3MXkyd2h5In0.qIl074xmbSWfU8X5Ilfmdg&limit=1'
    axios.get(API_URL).then(response=>{
        if(response.data.error) callback(undefined, 'Unable to find location. Try another search.')
        else callback(undefined,{
            latitude: response.data.features[0].center[0],
            longitude: response.data.features[0].center[1],
            location: response.data.features[0].place_name
        })
    }).catch(error=>{
        callback(undefined, 'Unable to connect to location services!')
    })
    
}

module.exports = geocode
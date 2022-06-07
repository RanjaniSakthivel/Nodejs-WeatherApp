const request = require('request')

const geocode = (address, callback) => {
    //http://api.positionstack.com/v1/forward?access_key=6ce2dc28dd73eac312877e905013a2de&query=chennai
    const url = 'http://api.positionstack.com/v1/forward?access_key=6ce2dc28dd73eac312877e905013a2de&query=' + address + '&limit=1'
    //console.log('url machan ',url)
    request({ url, json: true }, (error, { body }) => {
        //console.log('inga iruken ',body.data.length)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (!body.data) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            //console.log(body.data);
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })
}

module.exports = geocode
'use strict';


// curl \
//  -H 'Authorization: Bearer 5IEX7VCRGKUWUOJUDMQ36RNYHZZ6XXGT' \
//  'https://api.wit.ai/message?v=20180306&q='
// 5IEX7VCRGKUWUOJUDMQ36RNYHZZ6XXGT

const request = require('superagent');

function handleWitResponse(res) {
    // console.log(res);
    return res.entities;
}

module.exports = function witClient(token) {

    const ask = function(message, cb){

        request.get('https://api.wit.ai/message').set('Authorization', 'Bearer '+ token).query({v: '20180306'})
        .query({q: message})
        .end((err, res) => {
            if(err) return cb(err);

            if(res.statusCode !=200) return cb('Expected 200 but got '+res.statusCode);

            const witResponse = handleWitResponse(res.body);

            return cb(null, witResponse);


        })

        console.log('ask: '+message);
        console.log('token: '+token);
    }

    return {
        ask : ask
    }
}
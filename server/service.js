'use strict'

const express = require('express');
const service = express();
const request = require('superagent');
const moment = require('moment');


// AIzaSyCbMgCaQLV69QYBPXzsRIcJG6hn2VhnVtY
// https://maps.googleapis.com/maps/api/geocode/json?address=vienna&key=AIzaSyCbMgCaQLV69QYBPXzsRIcJG6hn2VhnVtY



// https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=YOUR_API_KEY
// AIzaSyB8MUwi1pNBGBFS3GKlrvdRAF66cyvVWQQ
service.get('/service/:location', (req, res, next) => {
    request.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + req.params.location + '&key=AIzaSyCbMgCaQLV69QYBPXzsRIcJG6hn2VhnVtY', (err, response) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }


        const location = response.body.results[0].geometry.location;
        const timestamp = +moment().format('X');

        request.get('https://maps.googleapis.com/maps/api/timezone/json?location=' + location.lat + ',' + location.lng + '&timestamp=' + timestamp + '&key=AIzaSyB8MUwi1pNBGBFS3GKlrvdRAF66cyvVWQQ', (err,response) => {

            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
        
            const result = response.body;
            const timeString = moment.unix(timestamp+result.dstOffset+result.rawOffset).utc().format('dddd, MMMM Do YYYY, h:mm:ss a');
            res.json({result: timeString});
        });
 });
    // res.json({result:req.params.location});
    

    
});

module.exports = service;

// b82864149b5cda1a4de2bee712e970bd

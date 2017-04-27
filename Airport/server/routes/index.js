'use strict';

//Required modules
const express = require('express');
const router = express.Router();
const utils = require('../utils');

module.exports = function apiRouter(){


    //Route to get airport data
    router.get('/data', function(req, res, next){
        console.log('Retrieving Data');
        res.json(utils.parseAirportCodes('airport_codes.csv', 'US'));
    })
    
    return router;
}
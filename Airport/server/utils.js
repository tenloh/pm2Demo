'use strict'

/*
    For Utility Functions
*/

//Declaring required modules
const fs = require('fs');
const path = require('path');


//Common variables
const rootPath = path.join(__dirname, "..");
const dataPath = path.join(rootPath, '/data/');
const states_hash = require(dataPath + 'states_hash.json');


//Helper Functions

/*
    Parses airport codes from a given file and returns array of airports

    Inputs:
        @filename: File name of given airport code data. It is assumed that it lies in /data/
                    Each line has structure of 'ident,type,name,latitude_deg,longitude_deg,elevation_ft,continent,iso_country,iso_region,municipality,gps_code,iata_code,local_code'
        @filterFn: A filter function that returns true or false based on a given input

    Outputs:
        @airportArray: Array of airport codes and other relevant informatoin
*/
function parseAirportCodes(filename, countryFilter) {
    let fileContents = fs.readFileSync(dataPath + filename).toString();
    return fileContents.split('\n').filter(airport => filterByCountry(airport, countryFilter)).map(airport => {
        let line = airport.split(',');
        return {
            type: line[1],
            name: line[2],
            lat_deg: Number(line[3]),
            long_deg: Number(line[4]),
            continent: line[6],
            iso_country: line[7],
            iso_region: replaceIsoRegionWithState(line[8]),
            municipality: line[9],
            iata_code: line[11]
        }
    })
}


/*

Simple filter function to return true if it is an airport that matches a country.
Tailored to only give back large and medium airports

Inputs: 
    @input: Input line from the CSV file, given as a string
    @country: Country that is the fiter for this function
*/
function filterByCountry(input,country) {
    if(!input) return false;
    let line = input.split(',');
    return line[7] === country  /*country*/
            && line[11] /* has iata code */
            && (line[1] === 'small_airport' ||  line[1] ==='large_airport' || line[1] === 'medium_airport') /* is an airport */
            && line[2].indexOf('Air Force Base') === -1  && line[2].indexOf('Army') === -1/* Don't want to include army/air force bases */
            ? true : false;
}

/*
    Function to replace iso region with states

    Inputs:
        @iso_region: Comes in the form 'US-{STATE CODE}'
*/
function replaceIsoRegionWithState(iso_region){
    return states_hash[iso_region.split('-')[1]] || null;
}

module.exports = {
    parseAirportCodes: parseAirportCodes,
    filterByCountry: filterByCountry,
    replaceIsoRegionWithState: replaceIsoRegionWithState,
}



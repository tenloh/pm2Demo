'use strict'

/*

    CALCUATING DISTANCE SCRIPTS AND FUNCTIONS

*/
//Havershine formula - http://www.movable-type.co.uk/scripts/latlong.html
function calcDistance() {
    if(!errorHandler()){
      return;  
    };
    let dlon = degreesToRadians(appVars.orig.long_deg - appVars.dest.long_deg);
    let dlat = degreesToRadians(appVars.orig.lat_deg - appVars.dest.lat_deg);
    let a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
        Math.cos(degreesToRadians(appVars.orig.lat_deg)) *
        Math.cos(degreesToRadians(appVars.dest.lat_deg)) *
        Math.sin(dlon / 2) * Math.sin(dlon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let R = 3961; //Radium of earth in miles
    // distanceText.innerHTML = 'The distance between ' + orig.name + ' and ' + dest.name + ' is approximately '
    //     + Math.floor(convertToNautMiles(R * c)) + ' nautical miles.';

    appVars.elements.distanceText.innerHTML = Math.floor(convertToNautMiles(R * c));
    drawPath(); //Calling the draw path function on the map, once the two nodes have been set and the distance calculated
}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function convertToNautMiles(miles){
    return 0.868976 * miles;
}


/* Create error toggle for inputs if unselected while calculating */
function errorHandler(){
    if(!appVars.orig){ /* Does not have origin airport */
        appVars.elements.origin_search.parentElement.className += ' has-error has-feedback';
        return false
    } 
    if(!appVars.dest){ /* Does not have destination airport */
        appVars.elements.destination_search.parentElement.className += ' has-error has-feedback';
        return false
    }
    if(appVars.orig.name === appVars.dest.name){ /* Does not have two unique airports */
        appVars.elements.destination_search.parentElement.className += ' has-error has-feedback';
        appVars.elements.distanceText.innerHTML = 'Airports Not Unique';
        appVars.elements.distanceText.style.color = 'Red';
        return false
    }
    return true;
}

/* Clearing errors and resetting calculated fields whenever something is selected */
function resetFields(){
    appVars.elements.origin_search.parentElement.className = 'form-group';
    appVars.elements.destination_search.parentElement.className = 'form-group';
    appVars.elements.distanceText.innerHTML = '';
    appVars.elements.distanceText.style.color = 'Black';
}
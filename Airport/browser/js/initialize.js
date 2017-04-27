'use strict'

//DECLARE GLOBAL VARIABLES

var appVars = {
    airports: null,
    elements: {
        origin: document.getElementById('origin'), //datalist
        destination: document.getElementById('destination'),//datalist,
        origin_search: document.getElementById('origin-search'),//search input,
        destination_search: document.getElementById('destination-search'),//search input,
        distanceText: document.getElementById('distance'),
    },
    orig: null,
    dest: null,
    map: null,
    markerStore: {},
    markerIcon: {
        origin: { color: 'red', label: '1' },
        destination: { color: 'green', label: '2' },
    },
    flightPath: null,
}


/*
    When the application is first loaded, make a call to grab the airports and populate dropdowns
*/
let grabData = new XMLHttpRequest();
grabData.open("GET", "/api/data");
grabData.responseType = "text";
grabData.send();

grabData.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        appVars.airports = JSON.parse(this.responseText);
    }
};


/*
    Function that happens on change from the dropdowns

    Sets either or origin or destination to track the airport chosen and creates a marker on the map
*/
function oninput() {
    let value = this.value //The current selected value of the datalist input field
    resetFields(); //Reset the field each time an input is selected to avoid confusion
    //Search through the airports available and see if the input field matches any known airports and return that detail
    let airportDetails = appVars.airports.filter(airport => {
        return airport.name === this.value.split('(')[0].trim();
    })[0]

    if (this.id === 'origin-search') {
        appVars.orig = airportDetails;
    } else {
        appVars.dest = airportDetails;
    }

    if (airportDetails) createMarker(airportDetails.lat_deg, airportDetails.long_deg, this.id);
}

//BIND EVENT HANDLERS
appVars.elements.origin_search.oninput = oninput;
appVars.elements.destination_search.oninput = oninput;
appVars.elements.origin_search.addEventListener('keyup', onKeyUp);
appVars.elements.destination_search.addEventListener('keyup', onKeyUp);


/*
    Function to append options to a dropdown

    Inputs:
        @airports: List of airport objects to be valid options
        @element: The element (which dropdown) to populate'
        @limit: The maximum number of elements to display

*/
function appendToLists(airports, element, limit) {
    for (let i = 0; i < Math.min(limit, airports.length); i++) {
        let originOption = document.createElement('option');
        originOption.text = `${airports[i].name} ( ${airports[i].iata_code} )`
        appVars.elements[element].appendChild(originOption);
    }
}


/*
    Event triggered function onkeyup to filter the list based on the search criteria.
    Throttled search results to 20 to avoid long lag times.

*/
function onKeyUp() {
    //Event keycodes of backspace, delete, and all the numbers and letters - modification of input field
    if (event.keyCode === 8 || (event.keyCode > 45 && event.keyCode < 91)) {
        let value = this.value;
        let id = this.id.split('-')[0];
        appVars.elements[id].innerHTML = '';
        appendToLists(appVars.airports.filter(airport => {
            if (airport.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                airport.iata_code.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                return true
            }
        }), id, 20)
    }
}


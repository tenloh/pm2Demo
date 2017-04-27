'use strict'

/*
    DRAWING MAP FUNCTIONS AND SCRIPTS
*/


/*
    Initialize Map upon Load and center on Chicago
*/
function initMap() {
    var latlng = new google.maps.LatLng(37.09024, -95.712891);
    appVars.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
}

/*
    Creating a marker to add to the google Map

    Inputs:
        @lat: Latitude of point in degrees
        @lng: Longitude of point in degrees
        @pointType: Point type indicates origin or destination, will be either 'origin-search' or 'destination-search'
*/
function createMarker(lat, lng, pointType) {
    removeMarker(pointType);
    
    let marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: appVars.map,
        icon: pinSymbol(appVars.markerIcon[pointType.split('-')[0]].color),
        label: appVars.markerIcon[pointType.split('-')[0]].label
    })
    pointType === 'origin-search' ? appVars.markerStore['orig'] = marker : appVars.markerStore['dest'] = marker;

    resize(); //Resizing the map to find the boundaries of the two points.

}

/*
    Simple pin symbol generation using SVG
    https://developers.google.com/maps/documentation/javascript/symbols
*/
function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 1,
        scale: 1,
        labelOrigin: new google.maps.Point(0,-29)
    };
}


/*
    Removing a marker from the Google Maps. Also removes the flight path if already displayed

    Input: 
        @pointType: Point type indicates origin or destination, will be either 'origin-search' or 'destination-search'
*/
function removeMarker(pointType) {
    if (pointType === 'origin-search' && appVars.markerStore['orig']) {
        appVars.markerStore['orig'].setMap(null);
        delete appVars.markerStore['orig']
    } else if (pointType === 'destination-search' && appVars.markerStore['dest']) {
        appVars.markerStore['dest'].setMap(null);
        delete appVars.markerStore['dest'];
    }
    if(appVars.flightPath) {
        appVars.flightPath.setMap(null)
        appVars.flightPath = null;
    }
}


/*
    Helper function to draw path between two points and only if there are no current lines
*/
function drawPath(){
    //Don't draw a path if there is already one or there isn't two markers yet
    if(Object.keys(appVars.markerStore).length < 2 || appVars.flightPath) return;

    appVars.flightPath = new google.maps.Polyline({
        path: [appVars.markerStore['orig'].position,appVars.markerStore['dest'].position],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    appVars.flightPath.setMap(appVars.map);
}

/*
    Helper function to resize the map - Only resizes if there are multiple points on the map
*/
function resize(){
    //Don't resize map if there are less than two points and if it doesn't pass error handler
    if(Object.keys(appVars.markerStore).length < 2 || !errorHandler()) return;
    var latLngBounds = new google.maps.LatLngBounds();
    for(let key in appVars.markerStore){
        latLngBounds.extend(appVars.markerStore[key].position)
    }
    appVars.map.fitBounds(latLngBounds);
}


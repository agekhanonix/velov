/* =================================================== **
*                     GMAP OBJECT                       *
** =================================================== */
/* Auteur    : Thierry CHARPENTIER                      *
*  Date      : 29.07.2018                               *
*  Version   : V1R0                                     *
*
* ==================================================== */

function Gmap(divId, latitude, longitude) {
    this.divId = divId;
    this.latitude = latitude;
    this.longitude = longitude;
    var latLng = new google.maps.LatLng(this.latitude, this.longitude);
    var myOptions = {
        zoom: 14,
        center: latLng,
        styles: [
            {elementType: "geometry",stylers: [{color: "#d9eef4"}]},
            {featureType: 'road',elementType: 'geometry',stylers: [{color: '#f9eaac'}]},
            {featureType: 'road',elementType: 'geometry.stroke',stylers: [{color: '#212a37'}]},
            {featureType: 'road',elementType: 'labels.text.fill',stylers: [{color: '#9ca5b3'}]},
            {featureType: "road",elementType: "labels.icon",stylers: [{visibility: "on"}]},
            {featureType: "road.arterial", elementType: "geometry",stylers: [{color: "#ffd9db"}]},
            {featureType: 'road.arterial',elementType: 'geometry.stroke',stylers: [{color: '#1f2835'}]},
            {featureType: 'road.arterial',elementType: 'labels.text.fill',stylers: [{color: '#9ca5b3'}]},
            {featureType: 'road.highway',elementType: 'geometry',stylers: [{color: '#746855'}]},
            {featureType: 'road.highway',elementType: 'geometry.stroke',stylers: [{color: '#1f2835'}]},
            {featureType: 'road.highway',elementType: 'labels.text.fill',stylers: [{color: '#9ca5b3'}]},
            {featureType: 'water',elementType: 'geometry',stylers: [{color: '#3491b2'}]},
            {featureType: 'water',elementType: 'labels.text.fill',stylers: [{color: '#515c6d'}]},
            {featureType: 'water',elementType: 'labels.text.stroke',stylers: [{color: '#17263c'}]},
            {featureType: "transit",stylers: [{visibility: "on"}]},
            {featureType: "transit.line",elementType: "geometry",stylers: [{color: "#993300"}]},
            {featureType: "transit.line",elementType: "geometry.fill",stylers: [{color: "#993300"},{weight: 2}]},
            {featureType: "transit.line",elementType: "labels.text.fill",stylers: [{color: "#8f7d77"}]},
            {featureType: "transit.line",elementType: "labels.text.stroke",stylers: [{color: "#ebe3cd"}]},
            {featureType: "transit.station",elementType: "geometry",stylers: [{color: "#dfd2ae"}]},
            {featureType: "transit.station",elementType: "labels.icon",stylers: [{visibility: "on"}]},
            {featureType: "poi",elementType: "geometry",stylers: [{color: "#dfd2ae"}]},
            {featureType: "poi",elementType: "labels.text",stylers: [{visibility: "off"}]},
            {featureType: "poi",elementType: "labels.text.fill",stylers: [{color: "#93817c"}]},
            {featureType: "poi.business",stylers: [{visibility: "off"}]},
            {featureType: "poi.park",elementType: "geometry.fill",stylers: [{color: "#a5b076"}]},
            {featureType: "poi.park",elementType: "geometry.stroke",stylers: [{color: "#a5b076"}]},
            {featureType: "poi.park",elementType: "labels.text.fill",stylers: [{color: "#447530"}]},
        ],   
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        mapTypeControl: true,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.TOP
        }
    };
    this.objectMap = new google.maps.Map(document.getElementById(divId), myOptions);
}

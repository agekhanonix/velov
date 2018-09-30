/* =================================================== **
*                GMAP MARKER OBJECT                     *
** =================================================== */
/* Auteur    : Thierry CHARPENTIER                      *
*  Date      : 29.07.2018                               *
*  Version   : V1R0                                     *
*
* ==================================================== */

function StationMark(mId, mName, mAddress, mLat, mLng, mBikes, mStands, mType) {
    /* --- The icon choice depend on the type --- */
    arrMarkers = new Array();                            // Asociative array
    arrMarkers = {1: 'purple', 2: 'thick-blue', 3: 'light-blue', 4: 'green', 5: 'lemon', 6: 'yellow', 7: 'orange', 8: 'red', 9: 'black', 99: 'grey'};
    icone = 'public/images/markers/bicycle-' + arrMarkers[mType] + '-marker-25x39.png';''
   
    /* --- Extraction du nom et du no de la station --- */
    var strPos = mName.indexOf('-');                     // Position search for this character
    var name =  mName.substr(strPos +2, mName.length);   // Name extract
    /* --- Marker contruction                      --- */
    var title = name + "\r\n" + 
        'Lat : ' + mLat + ' Lng : ' + mLng + "\r\n" +
        'Adresse : ' + mAddress;
    var geopoint = new google.maps.LatLng(mLat, mLng);
    objMarker = new google.maps.Marker({
        position: geopoint,
        map: mId,
        title: title,
        icon: icone
    });
    var data = {'nom' : name,
        'address' : mAddress,
        'lat' : mLat,
        'lng' : mLng,
        'bikes' : mBikes,
        'stands' : mStands};

    objMarker.addListener('click', function() {
        document.getElementById('det-station').value = name;
        for(key in data) {
            document.getElementById('det-' + key).textContent = data[key];
            document.getElementById('st-' + key).value = data[key];
        }
    });
}

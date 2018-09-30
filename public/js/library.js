/* =================================================== **
*                  FUNCTIONS LIBRARY                    *
** =================================================== */
/* Auteur    : Thierry CHARPENTIER                      *
*  Date      : 29.07.2018                               *
*  Version   : V1R0                                     *
*
* JCD key    : 4b79668fa4a9e9f38c23f98a1a79d20d527a623c *
*            : 7f305f4a66773eaaf355b25eb583029d707b8585 *
* Google key : AIzaSyCXB6yLq41R_CSfl2saDa1pqqOutPwVNnI  *
* ==================================================== */

/* --- =========================================== --- **
**     EXTERNAL RESSOURCE DONWNLOADING                 **
** --- =========================================== --- */
function downloadUrl(url, callback) {
    var request = new XMLHttpRequest();
    if(!request) return false;
    request.open('GET', url);
    request.addEventListener('load', function(){
        if(request.status >= 200 && request.status < 400) {
            callback(request.responseText);
        } else {
            console.error(request.status + " " + request.statusText + " " + url);
        }
    });
    request.addEventListener('error', function(){
        console.error("Network error with URL : " + url);
    });
    request.send(null);
};
/* --- =========================================== --- **
**     INTERROGATION OF THE OPEN STATIONS DEPENDENT    **
**     WITH A CONTRACT                                 **
** --- =========================================== --- */
function affStationsOpen(idMap,contrat) {
    /*var url = 'public/php/getStation.php?contract=' + contrat;*/
    var contract = contrat;
    var JCDKey = '7f305f4a66773eaaf355b25eb583029d707b8585'; // La clé d'API JCDecaux utilisée
    var url = 'https://api.jcdecaux.com/vls/v1/stations?contract=' + contract + '&apiKey=' + JCDKey;
    downloadUrl(url, function(data){
        var jsonObject = eval('(' + data + ')');
        var stations = jsonObject;
        var m = [];
        for(var i=0; i<stations.length; i++) {
            var station = stations[i];
            var name = station.name;
            var address = station.address;
            var lat = parseFloat(station.position.lat);
            var lng = parseFloat(station.position.lng);

            var status = (station.status != 'CLOSED' && station.status != 'OPEN') ? 'NC' : station.status;

            var bikes = (Number.isInteger(station.available_bikes)) ? 
                station.available_bikes : parseInt(station.available_bikes);

            var stands = (Number.isInteger(station.available_bike_stands)) ?
                station.available_bike_stands :
                parseInt(station.available_bike_stands);
            var type = 99;
            if(status == 'OPEN' && bikes > 0) {
                if(bikes > 0 && bikes <= 2) {
                    type=7;
                } else if(bikes > 2 && bikes <= 5) {
                    type=6;
                }else if(bikes > 5 && bikes <= 10) {
                    type=5;
                } else if(bikes > 10) {
                    type=4;
                }
                m = new StationMark(idMap, name, address, lat, lng, bikes, stands, type);
            }
        };
    });
}
/* --- =========================================== --- **
**    TO OBTAIN THE PUNCTUAL COORDINATES FLIES OVER    **
**    BY THE CURSOR                                    **
** --- =========================================== --- */
function getCoordsCursor(canvas, evt) {
    var rect = canvas.getBoundingClientRect();          // return the size of an element and its relative position compared to the zone of posting (viewport)
    return {
      left: Math.round(evt.clientX - rect.left),
      top: Math.round(evt.clientY - rect.top)
    };
}
/* --- =========================================== --- **
**           TESTING FOR STORAGE AVAILABILITY          **
** --- =========================================== --- */
function storageAvailable(type) {
    try {
        var storage = window[type],x = '__storage_text__';
        storage.setItem(x,x);
        storage.removeItem(x);
        return true;
    } catch(e) {
        return e instanceof DOMException && (
            e.code === 22 || e.code === 1014 || 
                e.name === 'QuotaExceedError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            storage.length !== 0; 
    }
}
/* --- =========================================== --- **
**               SETTING VALUES IN STORAGE             **
** --- =========================================== --- */
function settingLocalStorage(data) {
    for(var key in data) {
        if(data.hasOwnProperty(key)) {
            localStorage.setItem(key, data[key]);
        }
    }
}
/* --- =========================================== --- **
**                CLEAR ENTIRE STORAGE                 **
** --- =========================================== --- */
function clearLocalStorage() {
    localStorage.clear();
}

/* --- =========================================== --- **
**                    DATE 2 STRING                    **
** --- =========================================== --- */
Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear();
    var mm = this.getMonth() < 9 ? '0' + (this.getMonth() + 1) : (this.getMonth() + 1); 
    var dd = this.getDate() < 10 ? '0' + this.getDate() : this.getDate();
    return "".concat(yyyy).concat(mm).concat(dd);
}
Date.prototype.yyyymmddhhmm = function() {
    var yyyy = this.getFullYear();
    var mm = this.getMonth() < 9 ? '0' + (this.getMonth() + 1) : (this.getMonth() + 1); 
    var dd = this.getDate() < 10 ? '0' + this.getDate() : this.getDate();
    var hh = this.getHours() < 10 ? '0' + this.getHours() : this.getHours();
    var min = this.getMinutes() < 10 ? '0' + this.getMinutes() : this.getMinutes();
    return "".concat(yyyy).concat(mm).concat(dd).concat(hh).concat(min);
}
Date.prototype.yyyymmddhhmmss = function() {
    var yyyy = this.getFullYear();
    var mm = this.getMonth() < 9 ? '0' + (this.getMonth() + 1) : (this.getMonth() + 1); 
    var dd = this.getDate() < 10 ? '0' + this.getDate() : this.getDate();
    var hh = this.getHours() < 10 ? '0' + this.getHours() : this.getHours();
    var min = this.getMinutes() < 10 ? '0' + this.getMinutes() : this.getMinutes();
    var sec = this.getSeconds() < 10 ? '0' + this.getSeconds() : this.getSeconds();
    return "".concat(yyyy).concat(mm).concat(dd).concat(hh).concat(min).concat(sec);
}
Date.prototype.toStringDate = function() {
    var shortMonthNames = new Array();
    shortMonthNames = {1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 
        7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'};
    var year = this.getFullYear();
    var month = shortMonthNames[this.getMonth()];
    var day = this.getDate();
    var hour = this.getHours() < 10 ? '0' + this.getHours() : this.getHours();
    var min = this.getMinutes() < 10 ? '0' + this.getMinutes() : this.getMinutes();
    var sec = this.getSeconds() < 10 ? '0' + this.getSeconds() : this.getSeconds();
    return "".concat(month).concat(' ').concat(day).concat(' ').
        concat(hour).concat(':').concat(min).concat(':').concat(sec).
        concat(' ').concat(year);
}
/* --- =========================================== --- **
**              FIRST LETTER CAPITALIZING              **
** --- =========================================== --- */
function capitalize(str) {
    return str.substr(0,1).toUpperCase() + str.substr(1);
}
/* --- =========================================== --- **
**                    OBJECT DELETE                    **
** --- =========================================== --- */
var delObject = function(obj) {
    while(obj.childNodes.length > 0 ) {
        if(obj.firstChild.childNodes.length > 0) {
            this.delObject(obj.firstChild);
        } else {
            var tempo = obj.firstChild ;
			var a = tempo.attributes, i, l, n;
			if (a) {
			    l = a.length;
			    for (i = 0; i < l; i += 1) {
			        n = a[i].name;
			        if (typeof tempo[n] === 'function') {
			            tempo[n] = null;
			        }
			    }
			}
			tempo = null;
			obj.removeChild(obj.firstChild);
        }
    }
}
/* =================================================== **
*       PRINCIPAL FUNCTIONS OF THE APPLICATION         *
** =================================================== */
/* Author    : Thierry CHARPENTIER                      *
*  Date      : 29.07.2018                               *
*  Version   : V1R0                                     *
*
* JCD key    : 4b79668fa4a9e9f38c23f98a1a79d20d527a623c *
*            : 7f305f4a66773eaaf355b25eb583029d707b8585 *
* Google key : AIzaSyCXB6yLq41R_CSfl2saDa1pqqOutPwVNnI  *
* ==================================================== */
window.onload = preloader;
/* --- =========================================== --- */
/* ---       VARIABLES INITIALIZATION              --- */
/* --- =========================================== --- */
var stationName = '';

/* ---  THE SIGNATURE OF THE RESERVATION           --- */
var btnResa = document.getElementById('btnResa');
var btnClose = document.getElementsByClassName("close")[0];
var btnValid = document.getElementById('btnValid');
var elAlert = document.getElementById('alert');
var elSigna = document.getElementById('signature');
var elAffCompteur = document.getElementById('CR');
var elStation = document.getElementById('det-station');

/* ---             API JCDecaux                    --- */
var contrat = 'Lyon';                                   // JCDecaux contract name.
var timer = 120000;                                     // The Timer is set to 2 min
var centralLat = 45.7676905;                            // GPS coordinates for the map center
var centralLng = 4.8353706000000033;                    // 
var map;                                                // Objet {map}
var markers = new Array();                              // The markers array
var divId = 'google-map';                               // The div where map will be insert
var fdc;                                                // The map background object

/* ---                COUNTDOWN                    --- */
var beginDate;
var endDate;
var duration = 1200000;
var objCD;                                              // The Count Down
var trig = false;                                       // Trigger : if a reservation is in hand => false
var timeOutId;

btnResa.addEventListener('click', function(){
    if(document.getElementById('det-station').value === '') {
        elAlert.style.display = 'block';
    } else {
        elAlert.style.display = 'none';
        if(storageAvailable('localStorage')) {
            btnResa.disabled = true;
            elSigna.style.visibility = 'visible';

            /* -- Canvas initialisation -- */
            document.getElementById('canvasDiv').innerHTML = '';   
            zCanvas = new Canevas('canvasDiv', '150px', '160px', 'sig-canvas');
            btnValid.addEventListener('click', function(){
                reservation();                                          // the zone of reservation is displayed
            });
        } else {
            alert('Votre navigateur ne permet pas la reservation en ligne !');
        } 
    }
});
btnClose.addEventListener('click', function() {
    if(!trig) reinitResa();
});


/* ---                                             --- **
**          LAUNCHING OF AN ANIMATION DURING           **
**          LOADING OF THE CARROUSEL IMAGES            **
** ---                                             --- */
/* --- =========================================== --- **
** ---                 CARROUSEL                   --- **
/* --- =========================================== --- */
function preloader(){
    document.getElementById("loading").style.display = "none";
    document.getElementById("slideshow").style.visibility = "visible";
    document.getElementById("tutorial").style.visibility = "visible";
    document.getElementById("slogan").style.visibility = "visible";
    document.getElementById("header").style.visibility = "visible";
    initCarrousel();
    if(localStorage.getItem('stDate') !== null && localStorage.getItem('stStation') !== null) { // if a reservation is in hand
        elStation.value = localStorage.getItem('stStation');
        stationName = localStorage.getItem('stStation');
        objCD = new CountDown(duration, localStorage.getItem('stDate')); // CountDown is initialized with store date.
        arrKeys = new Array();
        arrKeys = ['nom', 'address', 'lat', 'lng', 'bikes', 'stands'];
        for (var k=0; k<arrKeys.length; k++) {
            document.getElementById('det-' + arrKeys[k]).textContent = localStorage.getItem('st' + capitalize(arrKeys[k]));
            document.getElementById('st-' + arrKeys[k]).value =  localStorage.getItem('st' + capitalize(arrKeys[k]));
        }
        btnResa.disabled = true;
        showResa();
    }
}

/* ---        CARROUSEL INITIALISATION             --- */
function initCarrousel(auto=false) {
    var cID = 'slideshow';                             // Id of the container
    var tID = 'tutorial';                              // Id of tutorial
    var nextID = 'next';                               // The id of the next button
    var prevID = 'prev';                               // The id of the previous button
    var slider = new Carrousel(cID, tID);              // The carrousel instanciation

    var interval = 15000;                              // Time interval setting to 15" between two images
    (auto === false) ? slider.next() : slider.next(interval); // Carrousel initialisation

    /* --- Management of mouse events              --- */
    document.getElementById(prevID).addEventListener(
        'click', function(){slider.previous();});      // Going to the previous slide, the carrousel is set to manual mode
    document.getElementById(nextID).addEventListener(
        'click', function(){slider.next();});          // Going to the next slide, the carrousel is set to manual mode
    document.getElementById(cID).addEventListener(
        'dblclick', function(){slider.next(interval);});// A double click on image, reload carrousel in automatic mode
    
    /* --- Management of keyboard events           --- */
    document.addEventListener('keydown',function(e){
        switch(e.keyCode) {
            case 38: // [UP ARROW] carrousel reloading in automatic mode forwards
                slider.next(interval);
                break;
            case 40: // [DOWN ARROW] carrousel reloading in automatic mode backwards
                slider.previous(interval);
                break;
            case 37: // [LEFT ARROW] Going to the previous slide, the carrousel is set to manual mode
                slider.previous();
                break;
            case 39: // [RIGHT ARROW] Going to the next slide, the carrousel is set to manual mode
                slider.next();
                break;
        }
    });
}

/* --- =========================================== --- **
** ---             API JCDecaux                    --- **
/* --- =========================================== --- */
/* ---  VE'LOV APPLICATION INITIALIZATION           --- */
function velov() {
    fdc = new Gmap(divId, centralLat, centralLng);
    affStationsOpen(fdc.objectMap, contrat);            // If true only the open stations are displayed
    window.setInterval('actualisation()', timer);       // Actualization function is set to timer value
}
/* ---   MAP MARKERS ACTUALIZATION   --- */
function actualisation() {
    affStationsOpen(fdc.objectMap, contrat);            // If true only the open stations are displayed
}

/* --- =========================================== --- **
** ---                 FOOTER                      --- **
/* --- =========================================== --- */
function reservation() {
    if(!trig) {
        objCD = new CountDown(duration);
        settingLocalStorage({stDate: objCD.beginDate,     
            stStation: elStation.value,
            stNom: document.getElementById('st-nom').value,
            stAddress: document.getElementById('st-address').value,
            stLat: document.getElementById('st-lat').value,
            stLng: document.getElementById('st-lng').value,
            stBikes: document.getElementById('st-bikes').value,
            stStands: document.getElementById('st-stands').value 
        });
        trig = true;
        stationName = localStorage.getItem('stStation');
    }
    elSigna.style.visibility = 'hidden';
    btnResa.disabled = true;
    showResa();
}
function showResa() {
    objCD.timeRemain();
    var chronometer = objCD.Return;
    if(chronometer['end'] == 2) {
        var showText = 'Le terme de votre réservation pour 1 vélo à la station ' + stationName + ' est échu !';
        clearLocalStorage();
        reinitResa();
    }
    if(chronometer['end'] == 1) {
        var showText = 'Le terme de votre réservation pour 1 vélo à la station ' + stationName + ' est échu !';
        clearLocalStorage();
        window.clearTimeout(timeOutId);
    }
    if(chronometer['end'] == 0) {
        timeOutId = setTimeout('showResa()', 1000);
        /* ---         TEXT INITIALIZATION             --- */
        var showText = "un vélo réservé à la station " + stationName + " pour ";
        var andWord = 'et';
        var dayWord = 'jours,';
        var hourWord = 'heures,';
        var minWord = 'minutes';
        var secWord = 'secondes.';

        if(chronometer['remDays'] == 0) {
            chronometer['remDays'] = '';
            dayWord = '';
        } else if(chronometer['remDays'] == 1) {
            dayWord = 'jour,';
        }

        if(chronometer['remHours'] == 0) {
            chronometer['remHours'] == '';
            hourWord = '';
        } else if(chronometer['remHours'] == 1) {
            hourWord = 'heure,'
        }

        if(chronometer['remMinutes'] == 0) {
            chronometer['remMinutes'] = '';
            minWord = '';
        } else if(chronometer['remMinutes'] == 1) {
            minWord = 'minute';
        }

        if(chronometer['remSecondes'] == 0) {
            chronometer['remSecondes'] = '';
            secWord = '';
        } else if(chronometer['remSecondes'] == 1) {
            secWord = 'seconde.';
        }

        if(chronometer['remDays'] == 0 &&
            chronometer['remHours'] == 0 &&
            chronometer['remMinutes'] == 0) {
            andWord = '';
        }

        if(chronometer['remSecondes'].length == 0) {
            minWord += '.';
        }
        if(chronometer['remSecondes'].length == 0 &&
            chronometer['remMinutes'].length == 0) {
            hourWord = hourWord.substring(0, hourWord.length -1) + '.';
        }
        if(chronometer['remSecondes'].length == 0 &&
            chronometer['remMinutes'].length == 0 &&
            chronometer['remHours'].length == 0) {
            dayWord.substring(0, dayWord.length -1) + '.';
        }
        
        if(dayWord.length > 0) {
            showText += chronometer['remDays'] + ' ' + dayWord;
        }
        if(hourWord.length > 0) {
            showText += chronometer['remHours'] + ' ' + hourWord;
        }
        if(minWord.length > 0) {
            showText += chronometer['remMinutes'] + ' ' + minWord;
        }
        if(secWord.length > 0) {
            showText += ' ' + andWord + ' ' + chronometer['remSecondes'] + ' ' + secWord;
        }        
    }
    elAffCompteur.innerHTML = showText;
}
/* ---    RESERVATION RE-INITIALIZATION        --- */ 
function reinitResa() {
    elSigna.style.visibility = 'hidden';
    document.getElementById('det-station').value = '';
    arrKeys = new Array();
    arrKeys = ['nom', 'address', 'lat', 'lng', 'bikes', 'stands'];
    for (var k=0; k<arrKeys.length; k++) {
        document.getElementById('det-' + arrKeys[k]).textContent = '';
        document.getElementById('st-' + arrKeys[k]).value = '';
    }
    btnResa.disabled = false;
    trig = false;
}
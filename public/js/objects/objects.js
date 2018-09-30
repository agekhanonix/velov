/* =================================================== **
*                       OBJECTS LIBRARY                 *
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
**                    CARROUSEL OBJECT                 **
** --- =========================================== --- */
function Carrousel(carrouselID, tutorielID=null) {
    this.tID = tutorielID;
    this.container = document.getElementById(carrouselID); // Carrousel container
    if(this.tID !== null) this.tutContent = document.getElementById(tutorielID); // Tutorial container
    this.slides = this.container.querySelectorAll('.' + carrouselID); // Slides array
    if(this.tID !== null) this.pages = this.tutContent.querySelectorAll('.page-' + tutorielID); // Pages array
    this.maxi = this.slides.length -1;                  // the highest index of array
    this.current = this.maxi;                           // the current index is set to highest index

    // Initialisation de départ
    this.slide(this.current);
}
/* --- Next method (next slide showing)                */                                          
Carrousel.prototype.next = function(interval) {
    (this.current === this.maxi) ? this.current = 0 : this.current += 1;
    
    this.stop();
    this.slide(this.current);

    if(typeof interval === 'number' && (interval % 1) === 0) {
        var context = this;
        this.run = setTimeout(function(){
            context.next(interval);
        }, interval);
    }
};
/* --- Previous method (previous slide showing)        */
Carrousel.prototype.previous = function(interval) {
    (this.current === this.maxi) ? this.current = 0 : this.current -= 1;
    
    this.stop();
    this.slide(this.current);

    if(typeof interval === 'number' && (interval % 1) === 0) {
        var context = this;
        this.run = setTimeout(function(){
            context.previous(interval);
        }, interval);
    }
};
/* --- Stop method (animation stop)                    */
Carrousel.prototype.stop = function() {
    clearTimeout(this.run);
};
/* --- Slide method current slide is showed            */
Carrousel.prototype.slide = function(index) {
    if(index > this.maxi) {index = 0;                  
    } else if(index < 0) {index = this.maxi;}

    if(index >= 0 && index <= this.maxi) {
        this.stop();
        for(var s=0; s<=this.maxi; s++) {
            if(s === index) {
                this.slides[s].style.display = 'inline-block';
                if(this.tID !== null) this.pages[s].style.display = 'inline-block';
            } else {
                this.slides[s].style.display = 'none';
                if(this.tID !== null) this.pages[s].style.display = 'none';
            }
        }
    } else {                                            // One is not safe from a stroke of luck
        alert("Index " + index + " doesn't exist. Available : 0 - " + this.maxi);
    }
};

/* --- =========================================== --- **
**                    GMAP OBJECT                      **
** --- =========================================== --- */
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
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    this.objectMap = new google.maps.Map(document.getElementById(divId), myOptions);
}

/* --- =========================================== --- **
**                    OBJET MARQUEUR                   **
** --- =========================================== --- */
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

/* --- =========================================== --- **
**                    CANEVAS OBJECT                   **
** --- =========================================== --- */
function Canevas (canvasDiv, canvasWidth, canvasHeight, canvasId) {
    /* -- Canvas initialization                     -- */
    var elCanvasDiv = document.getElementById(canvasDiv);
    elCanvas = document.createElement('canvas');            // For compatibility with old IE
    elCanvas.setAttribute('width', canvasWidth);            // Canevas attributes
    elCanvas.setAttribute('height', canvasHeight);
    elCanvas.setAttribute('id', canvasId);

    elCanvas.style.paddingTop = '5px';                      // Canevas Style
    elCanvas.style.paddingLeft = '5px';
    elCanvas.style.paddingBottom = '5px';
    elCanvas.style.paddingRight = '5px';
    elCanvas.style.border = '1px solid #3941b2';
    elCanvas.style.borderRadius = '2px';

    elCanvasDiv.appendChild(elCanvas);                      // The Canevas is insert in div 
    if(typeof G_vmlCanvasManager != 'undefined') {
        elCanvas = G_vmlCanvasManager.initElement(elCanvas);
    }

    var ctx = elCanvas.getContext('2d');                    // Contextualisation 2 dimensions of Canevas
    if(!ctx) {
        alert("Impossible de récupérer le contexte du canvas");
        return;
    }
    /* -- Init. des variables de gestion du canvas     -- */
    var coordPoint = new Array();                           // the punctual coordinates array
    var draw;                                               // Boolean specifying if a point must be displayed
    var pixX = new Array();                                 // The points array
    var pixY = new Array();
    var pixD = new Array();

    ctx.fillStyle = '#ffffff';                              // Background color
    ctx.strokeStyle = '#711f1c';                            // color of the feature
    ctx.lineWidth = 1.5;                                    // thickness of the feature
    ctx.lineCap = 'round';                                  // type d'extrémité
    ctx.lineJoin = 'round';                                 // type of intersection
    clear();

    elCanvas.addEventListener('mousedown', function(e){
        /* ---                                     --- **
        * On MouseDown event                            *
        * - we store point coordinates                  *
        * - the boolean draw is set to true             *
        * - the array of point is show                  *
        ** ---                                     --- */                      

        coordPoint = getCoordsCursor(elCanvas, e);
        
        draw = true;
        addClick(coordPoint['left'], coordPoint['top']);
        drawPixel();
    });

    elCanvas.addEventListener('mousemove', function(e){
        /* ---                                     --- **
        * On MouseMove event and if boolean draw = true *
        * - all points are stored                       *
        * - all points are drawed                       *
        ** ---                                     --- */
        if(draw) {
            coordPoint = getCoordsCursor(elCanvas, e);
            addClick(coordPoint['left'], coordPoint['top'], true);
            drawPixel();
        }
    });

    elCanvas.addEventListener('mouseup', function(e){
        /* ---                                     --- **
        * On MouseUp event                              *
        * - boolean draw is set to false                *
        ** ---                                     --- */
       draw = false; 
    });

    elCanvas.addEventListener('mouseleave', function(e){
        /* ---                                     --- **
        * On MouseLeave event                           * 
        * (when cursor leave the canvas)                *
        * - boolean draw is set to false                *
        ** ---                                     --- */
       draw = false;
    });

    function addClick(x, y, dragging) {
        pixX.push(x);
        pixY.push(y);
        pixD.push(dragging);
    }

    function drawPixel() {
        clear();
        for(var i=0; i<pixX.length; i++) {
            ctx.beginPath();
            if(pixD[i] && i) {
                ctx.moveTo(pixX[i-1], pixY[i-1]);
            } else {
                ctx.moveTo(pixX[i] -1, pixY[i]);
            }
            ctx.lineTo(pixX[i], pixY[i]);
            ctx.closePath();
            ctx.stroke();
        }
    }

    function clear() {
        ctx.clearRect(0,0, canvasWidth, canvasHeight);
    }
}

/* --- =========================================== --- **
**                    COUNTDOWN OBJECT                 **
** --- =========================================== --- */
function CountDown(timer, beginDate=null) {
    this.beginDate = (beginDate === null) ? new Date() : new Date(beginDate);
    this.endDate = new Date(this.beginDate.getTime() + timer); // End of the countdown;
    this.Return = new Array();
}
CountDown.prototype.timeRemain = function() {
    var currDate = new Date();
    var nbrSecondes = (this.endDate - currDate) / 1000;
    if(nbrSecondes > 0) {
        var end = 0; // Countdown always active
    } else if(nbrSecondes == 0) {
        var end = 1 ; // Countdown always inactive
    } else if(nbrSecondes < 0) {
        nbrSecondes = Math.abs(nbrSecondes);
        var end = 2;
    }
    var days = Math.floor(nbrSecondes / 86400); // Calculation of the days remaining
    var hours = Math.floor((nbrSecondes - (days * 86400)) / 3600); // Calculation of the hours remaining
    var minutes = Math.floor((nbrSecondes - ((days * 86400) + (hours * 3600))) / 60); // Calculation of the minutes remaining
    var secondes =  Math.floor(nbrSecondes - (days * 86400) - (hours * 3600) - (minutes * 60)); // Calculation of the secondes remaining
    this.Return = {end: end, remDays: days, remHours: hours, remMinutes: minutes, remSecondes: secondes}; // Countdown always active
}
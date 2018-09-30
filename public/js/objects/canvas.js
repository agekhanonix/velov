/* =================================================== **
*                       CANVAS OBJECT                   *
** =================================================== */
/* Auteur    : Thierry CHARPENTIER                      *
*  Date      : 29.07.2018                               *
*  Version   : V1R0                                     *
*
* ==================================================== */

function Canevas (canvasDiv, canvasWidth, canvasHeight, canvasId) {
    /* -- Canvas initialization                     -- */
    var elCanvasDiv = document.getElementById(canvasDiv);

    /* -- Set up the canvas                         -- */
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
    ctx.fillStyle = '#ffffff';                              // Background color
    ctx.strokeStyle = '#711f1c';                            // color of the feature
    ctx.lineWidth = 1;                                      // thickness of the feature
    ctx.lineCap = 'round';                                  // type d'extrémité
    ctx.lineJoin = 'round';        
    /* ** ========================================= ** **
    **                   MOUSE INPUT                   **
    ** ** ========================================= ** */
    /* -- Set up mouse or touch events for drawing  -- */
    var drawing = false;
    var mousePos = {x: 0, y: 0};
    var lastPos = mousePos;
    var isMobile = ('ontouchstart' in window) ||
        window.DocumentTouch && document instanceof DocumentTouch;
    var firstTouch = true;

    /* --- Mouse / Touch events                             -- */
    elCanvas.addEventListener((isMobile ? 'touchstart' : 'mousedown'), function(event){     // To toggle drawing mode 'ON'
        drawing = true;
        lastPos = getMousePos(elCanvas, event);
        if(firstTouch) {
            mousePos = getMousePos(elCanvas, event);
            firstTouch = false;
        }
    }, {passive: false});
    elCanvas.addEventListener((isMobile ? 'touchend' : 'mouseup'), function(event){         // To toggle drawing mode 'OFF'
        drawing = false;
        firstTouch = true;
    }, {passive: false});
    elCanvas.addEventListener((isMobile ? 'touchmove' : 'mousemove'), function(event) {     // To toggle mouse position, used in drawing
        mousePos = getMousePos(elCanvas, event);
    }, {passive: false});

    /* ==             Miscellaneous                 == **
    /* -- Get mouse position relative to the canvas -- */
    function getMousePos(canvasDom, event) {
        var rect = canvasDom.getBoundingClientRect();
        return {
            x: (isMobile ? event.touches[0].clientX : event.clientX) - rect.left,
            y: (isMobile ? event.touches[0].clientY : event.clientY) - rect.top
        };
    }
    
    // Draw to the canvas
    function drawPixels() {
        if (drawing) {
            ctx.moveTo(lastPos.x, lastPos.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
            lastPos = mousePos;
        }
    }

    /* -- Get a regular interval for drawing to     -- **
    ** -- the screen                                -- */
    window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimaitonFrame ||
            function (callback) {
                window.setTimeout(callback, 1000/60);
            };
    })();
    // Prevent scrolling when touching the canvas
    document.body.addEventListener("touchstart", function (event) {
        if (event.target.getAttribute('id') == canvasId) {
            event.preventDefault();
        }
    }, {passive: false});
    document.body.addEventListener("touchend", function (event) {
        if (event.target.getAttribute('id') == canvasId) {
            event.preventDefault();
        }
    }, {passive: false});
    document.body.addEventListener("touchmove", function (event) {
        if (event.target.getAttribute('id') == canvasId) {
            event.preventDefault();
        }
    }, {passive: false});
    // Allow for animation
    (function drawLoop () {
        requestAnimFrame(drawLoop);
        drawPixels();
    })();
}
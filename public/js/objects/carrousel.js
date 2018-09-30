/* =================================================== **
**                    CARROUSEL OBJECT                 **
** =================================================== */
/* Auteur    : Thierry CHARPENTIER                      *
*  Date      : 29.07.2018                               *
*  Version   : V1R0                                     *
*
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
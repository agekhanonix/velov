/* =================================================== **
*                      COUNTDOWN OBJECT                 *
** =================================================== */
/* Auteur    : Thierry CHARPENTIER                      *
*  Date      : 29.07.2018                               *
*  Version   : V1R0                                     *
*
* ==================================================== */

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
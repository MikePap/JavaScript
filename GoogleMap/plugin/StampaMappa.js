/*
PLUGIN che permette di stampare la mappa satellitare di Google in un elemento (<div>)
-- PARAMETRI: 
- la:		coordinata di latitudine 
- lo:		coordinata di longitudine 
- z:		valore dello zoom di visualizzazione mappa

*/

(function($) {
jQuery.fn.MappaGoogle = function(la,lo,z){ 
sto = this;
var ll = [la,lo]; 
var punto = new google.maps.LatLng(ll[0],ll[1]);
var myOptions = {
center: punto,
mapTypeId: google.maps.MapTypeId.ROADMAP,
zoom: z,
} // myOptions 

var iddi =  $(this).attr("id");
var map = new google.maps.Map(document.getElementById(iddi),  myOptions);

}; // chiude plugin 
})(jQuery)



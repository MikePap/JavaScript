/*
PLUGIN che permette di stampare la mappa satellitare di Google in un elemento (<div>) con la possibiltà di posizionare e assegnare uno stile ai vari strumenti che fanno parte della mappa. 

-- PARAMETRI: 
- la:		coordinata di latitudine 
- lo:		coordinata di longitudine 
- z:		valore dello zoom di visualizzazione mappa
- tipo:	controllo 'Tipo di mappa'  (HYBRID  ROADMAP  SATELLITE  TERRAIN)
- stipo:	stile del controllo 'Tipo di mappa' (DROPDOWN_MENU  HORIZONTAL_BAR  DEFAULT)	
- ptipo:	posizione del controllo 'Tipo di mappa'  
- pPan:	posizione del controllo 'Cerchietto con freccette di spostamento della mappa nelle quattro direzioni'
- sBarZ:	stile del controllo 'Barra dello zoom' (SMALL - LARGE )
- pBarZ:	posizione del controllo 'Barra dello zoom'
- pMan:	posizione del controllo 'Omino'
- SiNo:	valore boleano (true - false) per indicare se visualizzare o meno la 'Scala dell'unità di misura'

// ATTENZIONE: se non si vuole impostare un'opzione basta sostituirla con "" nella giusta posizione. 

# google.maps.ControlPosition class: costanti utilizzate per posizionare i controlli all'interno della mappa
BOTTOM_CENTER - BOTTOM_LEFT - BOTTOM_RIGHT - LEFT_BOTTOM - LEFT_CENTER - LEFT_TOP - RIGHT_BOTTOM - RIGHT_CENTER - RIGHT_TOP - TOP_CENTER - TOP_LEFT - TOP_RIGHT

*/

(function($) {
jQuery.fn.MappaGoogleOpz = function(la,lo,z,tipo,sTipo,pTipo,pPan,sBarZ,pBarZ,pMan,SiNo){ 
sto = this;
var ll = [la,lo]; 
var punto = new google.maps.LatLng(ll[0],ll[1]);
var myOptions = {
center: punto,
mapTypeId:tipo,		// 
zoom: z,

// Tipo di mappa 
mapTypeControl: true,		//  è necessario impostarlo a 'true' per impostare le proprietà
mapTypeControlOptions: {	 
style: sTipo,			
position: pTipo,
//mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID]	// eventualmente se si vuol cambiare l'ordine 
}, // mapTypeControlOptions

//Cerchietto con le freccette di spostamento della mappa nelle quattro direzioni
panControl: true,
panControlOptions: {
position: pPan
}, // panControlOptions

// Barra dello Zoom. NOTA: l'omino prende la posizione della barra dello zoom piazzandosi sopra di essa
zoomControl: true,		// 
zoomControlOptions: {
style: sBarZ,				
position: pBarZ
}, // zoomControlOptions

//Omino che permette di entrare nelle strade. Se omesse l'omino prende la posizione della barra dello zoom piazzandosi sopra di essa 
streetViewControl: true,	// 
streetViewControlOptions: {
position: pMan
}, // streetViewControlOptions

// Scala unità di misura. Per default non viene visualizzata  
scaleControl: SiNo,		// se impostato a 'true' viene automaticamente posizionata il basso a sinistra (BOTTOM_LEFT) anche se si potrebbe decidere di posizionarla altrove ma ... non lo ritengo opportuno perchè mi sembra la migliore posizione possibile 
/*
scaleControlOptions: {
position: google.maps.ControlPosition.TOP_RIGHT
}, // scaleControlOptions
*/
} // myOptions 

var iddi =  $(this).attr("id");
var map = new google.maps.Map(document.getElementById(iddi),  myOptions);

}; // chiude plugin 
})(jQuery)



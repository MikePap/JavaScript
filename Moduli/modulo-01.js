// modulo-01.js -- non funziona, aspettando JavaScript 6
/*
function nm_giorno_settimana(){
// Domenica => 0 , Lunedi => 1 ecc 
	var current_date = new Date();
	var nm_giorno =  current_date.getDay();
	var nm_giorno = "0" + nm_giorno;
	return nm_giorno;
} // 

export nm_giorno_settimana;

*/

/*
/* codice3 che richiede il modulo da inserire in un'altro file 
import nm_giorno_settimana from "modulo-01";
console.log(nm_giorno_settimana());


import asap from "asap";

asap(function() {
  console.log("hello async world!");
});

*/

var asap;
var isNode = typeof process !== "undefined" &&
             {}.toString.call(process) === "[object process]";

if (isNode) {
  asap = process.nextTick;
} else if (typeof setImmediate !== "undefined") {
  asap = setImmediate;
} else {
  asap = setTimeout;
}

export default asap;


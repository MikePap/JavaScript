// data_ora.js
/*
let newDate = function (){
	return new Date();
}
*/
let newDate = () =>	new Date();

let nm_giorno_settimana = () => newDate().getDay();				// Domenica => 0 , Lunedi => 1 ... 

let giorno_mese = () => (newDate().getUTCDate() < 10)	? "0"+newDate().getUTCDate() : newDate().getUTCDate();  // 1, 2, 3 ... 

let weekday = () => {
	var weekdays = ["Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato"];
	var weekdayNumber = newDate().getDay();
	return weekdays[weekdayNumber];
} 

let mesi = () => {
	var months = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
	var meseNumber = newDate().getMonth();
	return months[meseNumber]; 
} 

let anno = () =>  newDate().getFullYear();

let ore = () => (newDate().getHours() < 10)	? "0"+newDate().getHours() : newDate().getHours();

let minuti = () => (newDate().getMinutes() < 10)	? "0"+newDate().getMinutes() : newDate().getMinutes();

let secondi = () => (newDate().getSeconds() < 10)	? "0"+newDate().getSeconds() : newDate().getSeconds();

let data_oggi = () => weekday()+ ' ' +giorno_mese()+ ' ' +mesi()+ ' ' +anno();		// "Martedi 24 Febbraio 2015"

let ora_minuti = () => ore()+ ':' +minuti();				// "14:08"


export {nm_giorno_settimana, giorno_mese, weekday, mesi, anno, ore, minuti, secondi, data_oggi, ora_minuti}



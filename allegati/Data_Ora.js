var nm_giorno_settimana = function () { 
// Domenica => 0 , Lunedi => 1 ... 
	return new Date().getDay() 
};


var giorno_mese = function () {
// 1, 2, 3 ecc 
	var day = new Date().getUTCDate();
	return (day < 10) ? '0'+day : day;
} // ### giorno_mese ####


var weekday = function () {
	var current_date = new Date();
	var weekdays = new Array(7);
	weekdays[0] = "Domenica";		// Sunday
	weekdays[1] = "Lunedi";			// Monday
	weekdays[2] = "Martedi";		// Tuesday
	weekdays[3] = "Mercoledi";		// Wednesday
	weekdays[4] = "Giovedi";		// Thursday
	weekdays[5] = "Venerdi";		// Friday
	weekdays[6] = "Sabato";			// Saturday

	var weekday_value = current_date.getDay();
	var giorno = weekdays[weekday_value];
	return giorno;
} // #### weekday ####


var mese = function () {
	var current_date = new Date();
	var months = new Array(12);
	months[0] = "Gennaio";			// January
	months[1] = "Febbraio";			// February
	months[2] = "Marzo";				// March
	months[3] = "Aprile";			// April
	months[4] = "Maggio";			// May
	months[5] = "Giugno";			// June
	months[6] = "Luglio";			// July
	months[7] = "Agosto";			// August
	months[8] = "Settembre";		// September
	months[9] = "Ottobre";			// October
	months[10] = "Novembre";		// November
	months[11] = "Dicembre";		// December

	var mese_valore = current_date.getMonth();
	return months[mese_valore]; 
} //#### mese ####


var anno = function () { 
	return  new Date().getFullYear();
};


var ore = function () {
	return 	(new Date().getHours() < 10)	? ora="0"+new Date().getHours() : ora=new Date().getHours();
};


var minuti = function () {
	return (new Date().getMinutes() < 10)	? "0"+new Date().getMinutes() : new Date().getMinutes();
};


var secondi = function () {
	return (new Date().getSeconds() < 10)	? "0"+new Date().getSeconds() : new Date().getSeconds();
};



var data_oggi = function () { 
	return weekday()+ ' ' +giorno_mese()+ ' ' +mese()+ ' ' +anno();		// "Martedi 24 Febbraio 2015"
};


var ora_minuti = function () {
	return ore()+ ':' +minuti();				// "14:08"
};




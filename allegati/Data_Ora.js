function nm_giorno_settimana(){
//	Domenica => 0 , Lunedi => 1 ecc 
	var current_date = new Date();
	var nm_giorno =  current_date.getDay();
	var nm_giorno = "0" + nm_giorno;
	return nm_giorno;
} 


function giorno_mese(){
// 1, 2, 3 ecc 
	var current_date = new Date();
	var day = current_date.getUTCDate();
	if(day < 10)
		var giorni = "0"+day;
	else
		var giorni = day; 
	return giorni;
} 


function weekday(){
	var current_date = new Date();
	var weekdays = new Array(7);
	weekdays[0] = "Domenica";			// Sunday
	weekdays[1] = "Lunedi";				// Monday
	weekdays[2] = "Martedi";			// Tuesday
	weekdays[3] = "Mercoledi";			// Wednesday
	weekdays[4] = "Giovedi";			// Thursday
	weekdays[5] = "Venerdi";			// Friday
	weekdays[6] = "Sabato";				// Saturday

	var weekday_value = current_date.getDay();
	var giorno = weekdays[weekday_value];
	return giorno;
} 


function mese(){
	var current_date = new Date();
	var months = new Array(12);
	months[0] = "Gennaio";					// January
	months[1] = "Febbraio";					// February
	months[2] = "Marzo";						// March
	months[3] = "Aprile";					// April
	months[4] = "Maggio";					// May
	months[5] = "Giugno";					// June
	months[6] = "Luglio";					// July
	months[7] = "Agosto";					// August
	months[8] = "Settembre";				// September
	months[9] = "Ottobre";					// October
	months[10] = "Novembre";				// November
	months[11] = "Dicembre";				// December

	var mese_valore = current_date.getMonth();
	var nome_mese = months[mese_valore]; 
	return nome_mese;
} 


function anno(){
	var current_date = new Date();
	var annata = current_date.getFullYear();
	return annata;
} 


function ore(){
	var current_date = new Date();
	var hour = current_date.getHours();
	if(hour < 10)
		var ora = "0" +hour;
	else
		var ora = hour;
	return ora;
} 


function minuti(){
	var current_date = new Date();
	var minuto = current_date.getMinutes();
	if(minuto < 10)
		var minuts = "0" +minuto;
	else
		var minuts = minuto;
	return minuts;
}


function secondi(){
	var current_date = new Date();
	var seconds = current_date.getSeconds();
	if(seconds < 10)
		var secondo = "0" +seconds;
	else
		var secondo = seconds;
	return secondo;
} 


function data_oggi(){
	var giorno = weekday();
	var nm_giorno = giorno_mese();
	var mes = mese();
	var ann = anno();
	var jk = giorno+' '+nm_giorno+' '+mes+' '+ann;
	return jk;
} 


function ora_minuti(){
	var ora = ore(); 
	var minuts = minuti();
	var jk = ora+':'+minuts;
	return jk;
}



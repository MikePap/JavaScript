/*
Può capitare (e capita) che si vogliano aggiungere delle proprietà (chiave/valore) ad un oggetto esistente; può essere il caso di un elemento nodo oppure un semplice oggetto da definire in una funzione.
La funzione viene utile quando le proprietà (e i valori) da aggiungere sono numerose, allora si possono mettere le proprietà nel primo array e i valori nel secondo array: 

*/

export default function adPropsOggettoDaArrays(oggetto, array1, array2){
	var a, b;
	if(Array.isArray(array1) && Array.isArray(array2)){
		if(array1.length === array2.length ){ 
			for(var i=0; i < array1.length; i++){
				a = array1[i];
				b = array2[i];
				oggetto[a] = b;
			}
		}
	}
}

/*

Esempio:
var o = {};
var a = ['uno', 'due', 'tre'];
var b = ['rosso', 'verde', 'bianco'];

adPropsOggettoDaArrays(o, a, b);				// {uno: "rosso", due: "verde", tre: "bianco"}

Se andiamo ad aggiungere delle proprietà all'oggetto, il quale a sua volta contiene già delle proprietà, le nuove si andranno ad aggiungere alle vecchie.
Se l'oggetto non esiste allora lo si deve definire cosi come fatto nell'esempio precedente. 

*/



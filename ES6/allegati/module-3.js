// In questo file si importa il file 'module-1.js' che poi a sua volta sarà importato dal file finale 'traceur.html'

import {double as somma} from 'allegati/module-1.js';		 
// anche se il file 'module-1.js' sta nella stessa directory bisogna comunque includere la cartella 'allegati' ... il perchè non l'ho capito
// Inoltre si può cambiare il nome della funzione 

var importExport = function (x){
	var s = somma(4);
//	var s = double(4);
	return x + s;
}

export {importExport}



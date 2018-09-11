/*
Permette di caricare un file .js dinamicamente all'interno del documento con l'uso del 'Document Fragment'
*/
export default function caricaJS(scriptJS) {
	var df = document.createDocumentFragment();			// viene creato un oggetto 'Document Fragment' 
	var codice = document.createElement("script");
	codice.type = "text/javascript";
	codice.src = scriptJS;
	df.appendChild(codice);	
	document.body.appendChild(df);
} // 


/*
// Senza l'uso del 'Document Fragment' 

function caricaJS(scriptJS){
	var codice = document.createElement("script");
	codice.src = scriptJS;
	codice.type = "text/javascript";
	document.body.appendChild(codice);
	return codice;
} // 


*/


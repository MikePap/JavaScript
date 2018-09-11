/* ### creaNodi.js ###
La funzione "creaNodi()" permette di creare elementi (nodi DOM) dinamici. 
- "name": il nome del nodo. 
- "attributi": (opzionale) è un oggetto che contiene degli attributi da assegnare all'elemento creato; se non s'intende creare degli attributi gli si assegna il valore 'null'. 
- "stili": (opzionale) è un oggetto che contiene stili CSS da assegnare all'elemento creato; anch'esso può avere valore 'null' se non si intende aggiungere stili.
Altri argomenti opzionali possono essere aggiunti. 
Il quarto argomento eventuale in caso fosse una stringa rappresenterebbe il testo (textNode) dell'elemento creato; oppure può essere un'altro nodo (o più nodi) da inserire all'interno dell'elemento creato 

Esempio di chiamata: 
var paragrafo = creaNodi("p", {title:'sono un par', id:'par', class:'cheClasse'}, {color:'red', background:'yellow'}, 'Paragrafo con stile');

*/

/////////////////////////////////////////////	per vecchi browser		//////////////////////////////////////////

export default	function creaNodi(name, attributi, stili) {
	var node = document.createElement(name);

	if (attributi) {
		for (var attr in attributi)
			if (attributi.hasOwnProperty(attr))
				node.setAttribute(attr, attributi[attr]);
	}

	if(stili) {
		for(var s in stili) 
			if (stili.hasOwnProperty(s))
				node.style[s] = stili[s];	
	}
	
	for (var i = 3; i <  arguments.length; i++) {
		var child = arguments[i];
		if (typeof child == "string")
			child = document.createTextNode(child);
		node.appendChild(child);
	}
	return node;
}

/*
////////////////////////////////////////////////	con ES6			//////////////////////////////////////////////////////	

export default	function creaNodi(name, attributi, stili) {
	let node = document.createElement(name);

	if (attributi) {
		for (let attr in attributi)
			if (attributi.hasOwnProperty(attr))
				node.setAttribute(attr, attributi[attr]);
	}

	if(stili) {
		for(let s in stili) 
			if (stili.hasOwnProperty(s))
				node.style[s] = stili[s];	
	}
	
	for (let i = 3; i <  arguments.length; i++) {
		let child = arguments[i];
		if (typeof child == "string")
			child = document.createTextNode(child);
		node.appendChild(child);
	}
	return node;
}
*/


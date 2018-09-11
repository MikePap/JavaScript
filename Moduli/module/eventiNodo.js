/* ### iteraCiclo.js ###
"nodiLiberi" e "nodiFigli"	sono due funzioni  base che richiamano una funzione esterna. Quest'ultima, richiamata nel documento, esegue un compito a seguito di un evento ('click', 'mouseover' eecc...) che scatta sul nodo target. 
La differenza tra le due funzioni sta nel fatto che in "nodiFigli" i nodi stanno all'interno di un elemento genitore mentre in "nodiLiberi" i vari nodi sono liberi.
@ Parametri:
- nodi:				sono nodi che hanno qualcosa in comune (es: la stessa classe o lo stesso tag)
- nodoGenitore:	è l'elemento genitore che contiene i nodi target 
- evento:			è l'evento che scatta su ogni singolo nodo (es: click, mouseover ecc.. )
- funzione:			è la funzione esterna (richiamata nel documento HTML) che esegue un compito preciso a seguito dell'evento

# Esempi di chiamata:
 nodiLiberi('.pasti', 'click', eseguiCompito);		// 'pasti' è la classe che accomuna i nodi
 nodiFigli("#Genitore", "click", eseguiCompito);	// 'genitore' è l'elemento che contiene i nodi

function eseguiCompito(e){									// definita nel documento HTML 
	console.log(e.textContent);							// mostra il contenuto testo del nodo
}
*/

let nodiLiberi = (nodi, evento, funzione) => {
	var nodi = document.querySelectorAll(nodi);
	for(let nodo of nodi){
		nodo.addEventListener(evento, function (event){
			funzione(event.target);
		},false);
	}
}

let nodiFigli = (nodoGenitore, evento, funzione) => {
	var genitore = document.querySelector(nodoGenitore);
	genitore.addEventListener(evento, function (e){
		funzione(e.target);
	},false);
}


export {nodiLiberi, nodiFigli}

/*

### Metodi ES5 ### 

function nodiLiberi(nodi, evento, funzione){
	var nodi = document.querySelectorAll(nodi);
	for(var i=0; i< nodi.length; i++){
		var nodo = nodi[i];
		nodo.addEventListener(evento, function (event){
//			console.log(this.textContent);
			funzione(event.target);
		},false);
	}
}

function nodiFigli(nodoGenitore, evento, funzione){
	var genitore = document.querySelector(nodoGenitore);
	genitore.addEventListener(evento, function (e){
		funzione(e.target);
	},false);
}
*/







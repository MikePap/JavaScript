/* ### setProp_CSS.js ###
La funzione "setCss" è un pattern semplificato per l'impostazione di stili CSS per un elemento 
Esempio chiamata:		
setCss("#elemento", {'height': '100px', 'marginLeft':'31px', 'padding':'20px 0'});

Da notare che in questo modulo si è importato una funzione da un'altro modulo "creaNodi.js" 
*/

import nuovoElemento from "./creaNodi.js";				// caricamento di un'altro modulo  

/*
///////////////////////////////////////////		con ES6		/////////////////////////////////////////////

let setCss = (nodo, props) => {
	let elem = document.querySelector(nodo);
	if(props){
		for(let prop in props){
			if (props.hasOwnProperty(prop)){
				elem.style[prop] = props[prop];
			}
		}
	}
}
*/

function setCss(nodo, props) {
	var elem = document.querySelector(nodo);
	if(props){
		for(var prop in props){
			if (props.hasOwnProperty(prop)){
				elem.style[prop] = props[prop];
			}
		}
	}
}



export {nuovoElemento, setCss}




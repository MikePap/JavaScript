/* ### rilevaStile.js
Funzione che permette di ottenere il valore di un definito stile CSS dall'elemento
- "elemento":	è il nodo di cui si vuol conoscere lo stile
- "stile":		è la proprietà CSS di cui si vuol conoscere il valore
*/

export default	function rilevaStile(elemento, stile){
	var elem = document.querySelector(elemento); 
	var computedStyle = null;

	if (typeof elem.currentStyle !== "undefined"){
		computedStyle = elemento.currentStyle[stile];											//per IE
	}else{
//		computedStyle = document.defaultView.getComputedStyle(elem, null)[stile];		//altri browser
		computedStyle = window.getComputedStyle(elem)[stile];									//uguale al precedente
	}

	return computedStyle;
}

/*
var larghezza = rilevaStile("#elemento", 'width');			
var sfondo = rilevaStile("#elemento", "backgroundColor");	

console.log(larghezza);					// 1340px
console.log(sfondo);						// rgb(255, 255, 0)

*/


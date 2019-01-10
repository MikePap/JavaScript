////	Polyfill	remove	////
//var el = document.getElementById('div-01');
//el.remove();
//el.nextElementSibling.remove();					// rimuove il <div id="div-02">

(function (arr) {
	arr.forEach(function (item) {
		if (item.hasOwnProperty('remove')) {
			return;
		}
		Object.defineProperty(item, 'remove', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: function remove() {
				if (this.parentNode !== null)
				this.parentNode.removeChild(this);
			}
		});
	});
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);



// Funzione che elimina gli elementi interni ad uno specificato nodo
let eliminaNodiInterni = (nodo) => {
	const elementiNodo = document.querySelectorAll(nodo+' > *');
	for(let i=0; i < elementiNodo.length; i++){
		elementiNodo[i].parentNode.removeChild(elementiNodo[i]);		
	}
};

// Funzione che permette di eliminare soltanto un nodo in base al suo attributo "id".
// «genitore» è l'id del nodo genotore; «iddiNodo» è l'attributo "id" dell'elemento interno da eliminare;
// Es: eliminaNodoBox("#divGenitore", idDiv)
let eliminaNodoBox = (genitore, iddiNodo) => {
	const elementiBox = document.querySelectorAll(genitore+' > *');
	let i, elem;
	for(i=0; i < elementiBox.length; i++){
		elem = elementiBox[i];
		if(elem.getAttribute('id') === iddiNodo)
//			elem.parentNode.removeChild(elem);
			elem.remove();											// con l'uso del metodo "remove"
	}
}




export { eliminaNodiInterni, eliminaNodoBox }


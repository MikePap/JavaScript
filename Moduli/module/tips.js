// tips.js


//	Funzione che cambia il selettore "querySelector()"
let $ = (selettore) => {
	let nodo = document.querySelector(selettore); 
	if(nodo instanceof Object)
		return nodo;
}

// Funzione che attraversa gli elementi di un'array assegnandoli ad una funzione per un eventuale processo. E' simile a "forEach"
// Può essere usata anche per processare gli elementi interni di un nodo quando li si estrae con il "document.querySelectorAll()"
let ciclo = (lista, funzione) => {
	let i, elemento;
	for (i= 0; i < lista.length; i++) {
		elemento = lista[i];
		if(elemento)
		funzione(elemento);
	}
}

// Funzione che restituisce un valore a caso da un dato array
let getRandom = arr => arr[Math.floor(Math.random() * arr.length)];
/*
var getRandom = function (arr){
	return arr[Math.floor(Math.random() * arr.length)];
}
*/

// Funzione che genera un array da zero ad un numero stabilito (massimo)
let daZero_A = massimo => {
	let numbersArray = [];
	for( let i=1; i <= massimo; i++){
		numbersArray.push(i);
	} 
	return numbersArray;
}

// Funzione che genera un array composto di numeri pari da zero ad un numero stabilito (massimo)
let arrayPari = function (massimo){
	let numbersArray = [];
	for( let i=1; i < massimo; i++){
		numbersArray.push(++i);					
	} 
	return numbersArray;
}

// Funzione che genera un array composto di numeri dispari da zero ad un numero stabilito (massimo)
let arrayDispari = function (massimo){
	let numbersArray = [];
	for( let i=1; i < massimo; i++){
		numbersArray.push(i++);					
	} 
	return numbersArray;
}

// La funzione permette di unire (concatenare) più array in un unico array.  Gli array sono passati come argomenti alla funzione 
let unioneArray = function (){
	let nums = [];
	for (let i = 0; i < arguments.length; i++){
		nums = nums.concat(arguments[i]);
	}
	return nums;
}


export {$, ciclo, getRandom, daZero_A, arrayPari, arrayDispari, unioneArray }





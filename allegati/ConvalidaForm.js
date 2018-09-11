//  ConvalidaForm.js

/*
*** ATTENZION BATTAGLION ***
Le seguenti funzioni "riapparenza()" e "dissolvenza()", applicata a tutte le successive, fa si che l'elemento che mostra il messaggio di errore per essere visualizzato in progressione debba avere impostato lo stile "opacity" nei CSS (naturalmente a zero) 
*/

var riapparenza = function (nodo) {
	var opacita;
	var tempo = 20;									// impostabile (un valore più alto rallenta l'effetto)
	var elem = document.querySelector(nodo);
	opacita = window.getComputedStyle(elem).opacity;
	var visualizzazione =  window.getComputedStyle(elem).display; 
	if(visualizzazione === 'none'){
		elem.style.display = 'block';		
	}
	if(opacita >= 1) { return };
	opacita = parseFloat(opacita) + 0.01;								// impostabili  0.1/2=> 0.05		
	elem.style.opacity = opacita;
	setTimeout(function(){ riapparenza(nodo)}, tempo);		// impostabili 50/0.1=> 500 (millesecondi) 
};  

var dissolvenza = function (nodo) {
	var opacita;
	var tempo = 5;										// impostabile (un valore più basso aumenta l'effetto)
	var elem = document.querySelector(nodo);
	opacita = window.getComputedStyle(elem).opacity ;
	var visualizzazione = window.getComputedStyle(elem).display; 
	if(opacita <= 0 ) { return };
	opacita = parseFloat(opacita) - 0.01;								// impostabili  0.1/2=> 0.05		
	elem.style.opacity = opacita;
	setTimeout(function(){ dissolvenza(nodo)}, tempo);		// impostabili 50/0.1=> 500 (millesecondi)		
}

/*
#####	Funzione preventiva input dannosi #####
la funzione, che è stata inserita in tutte le funzioni successive, trasforma alcuni caratteri speciali, che potrebbero essere oggetto di iniezione di codice dannoso, all'interno dei documenti, con l'encoding.  
*/
function escapeHtml(str) {
	return String(str)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#x27;")
		.replace(/\//g, "&#x2F;")  
} // 

///////////////////////////////////////////////////////////////////////////////////////////

/*
### Verifica campo (input) ###
Restituisce un alert o un messaggio di errore nel campo 'elementoErrore' a seconda se quest'ultimo sia impostato
*/
var validateInput = function (campo, minimo, elementoErrore) {
	
	var elemErrore = document.querySelector(elementoErrore);
	var valoreCampo = escapeHtml(campo.value);
	if(minimo){
		if(valoreCampo.length <= minimo){
			if(elementoErrore){
				campo.style.background = '#f8dbdb';
//				elemErrore.style.display = 'block';
				riapparenza(elementoErrore);
				elemErrore.innerHTML = 'Almeno ' +minimo+ ' lettere';
			}else{
				campo.style.background = '#f8dbdb';
				alert('Almeno ' +minimo+ ' lettere');
			}
			return false;
		}else{
			campo.style.background = '';
			elemErrore.style.display = 'none';
			return true;
		}
	}else{
		if(valoreCampo.length == ''){
			campo.style.background = '#f8dbdb';
			alert('Campo Obbligatorio');
		}else{
			campo.style.background = '';
		}
	}
}; 

/*
### Verifica validità indirizzo email 	###
Restituisce un alert o un messaggio di errore nel campo 'elementoErrore' a seconda se quest'ultimo sia impostato
*/
var validateEmail = function (campoEmail, elementoErrore) {

	var elemErrore = document.querySelector(elementoErrore);
	var valEmail = escapeHtml(campoEmail.value);
	var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
//	var filter = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	if(filter.test(valEmail)){ 
		campoEmail.style.background = '';
		elemErrore.style.display = 'none';
		elemErrore.innerHTML = '';
		return true;
	}else{
		if(elementoErrore){
			campoEmail.style.background = '#f8dbdb';
			riapparenza(elementoErrore);
			elemErrore.innerHTML = 'Inserite una Email valida';
		}else{
			alert("Inserite una Email valida");
		}
		return false;
	}
}; 

/*
### Verifica del numero dei caratteri digitati in un campo (textarea)	###
Restituisce un alert o un messaggio di errore a seconda se 'elementoErrore' sia impostato. E' possibile anche inpostare solo il primo argomento 'campo' e in tal caso sarà restituito solo un alert. 
*/
var validateMessage = function (campo, massimo, elementoErrore) {

	var valoreCampo = escapeHtml(campo.value);
	var elemErrore = document.querySelector(elementoErrore);
	if(massimo){
		if(valoreCampo.length > massimo ){
			if(elementoErrore){
				campo.style.background = '#f8dbdb';
				riapparenza(elementoErrore);
				elemErrore.innerHTML = 'Hai digitato <b>'+ campo.value.length +'</b> caratteri. Non sono ammessi più di <b>'+massimo+'</b> caratteri';
			}else{
				alert('Hai digitato '+ campo.value.length +' caratteri. Non sono ammessi più di '+massimo+' caratteri');
			}
			return false;
		}else if(valoreCampo.length == ''){
			if(elementoErrore){
				campo.style.background = '#f8dbdb';
				riapparenza(elementoErrore);
				elemErrore.innerHTML = '<b>Campo Obbligatorio</b>';
			}else{
				elemErrore.innerHTML = '';
				alert('ATTENZIONE: Campo Obbligatorio');
			}
			return false;
		}else{
			campo.style.background = '';
			elemErrore.style.display = 'none';
			elemErrore.innerHTML = '';
			return true;
		}
	}else{
		if(valoreCampo.length == ''){
			campo.style.background = '#f8dbdb';
			alert('ATTENZIONE: Campo Obbligatorio');
			return false;
		}else{
			campo.style.background = '';
			return true;
		}
	} 
}; 

/* 
### Convalida campo password ### 
L'oggetto restituisce un alert o un messaggio di errore nel campo 'elementoErrore' a seconda se quest'ultimo viene impostato. Se l'argomento 'elemErrore' non lo si vuole impostare allora bisogna richiamarlo con null: validePass(campo,null,3). Se invece non si necessitano gli ultimi due argomenti si imposta semplicemente soltanto il primo argomento: validePass(campo);  
*/
var validatePass = function (campo, elementoErrore ,minimo) {

	var elemErrore = document.querySelector(elementoErrore);
	var massimo = campo.getAttribute('maxlength');					// impostato nella 'maxlength' dell'input
	var valoreCampo = escapeHtml(campo.value); 
	if(minimo){
		if(valoreCampo.length >= minimo && valoreCampo.length <= massimo ){
			campo.style.background = '';
			elemErrore.style.display = 'none';
			return true;
		}else{
			if(elementoErrore){
				campo.style.background = '#f8dbdb';
				riapparenza(elementoErrore);
				elemErrore.innerHTML = 'Inserite una password di minimo <b>'+minimo+ '</b> e massimo <b>' +massimo+ '</b> caratteri';
			}else{
				campo.style.background = '#f8dbdb';
				alert('Inserite una password di minimo '+minimo+ ' e massimo ' +massimo+ ' caratteri');
			}
			return false;
		}
	}else{	
		if(valoreCampo.length == ''){
			if(elementoErrore){
				campo.style.background = '#f8dbdb';
				riapparenza(elementoErrore);
				elemErrore.innerHTML = '<b>Campo Obbligatorio!</b>';
			}else{
				campo.style.background = '#f8dbdb';
				alert('Campo Obbligatorio');
			}
			return false;
		}else{ 
			campo.style.background = '';
//			elemErrore.style.display = 'none';
//			elemErrore.innerHTML = '';
			return true;
		}
	}
}; // 

/*
### Funzione di verifica che non si tratti di programma robot (una specie di captcha numerico) ###
*/
function captchaNumerico(lista) {
	var primo = document.querySelector(lista[0]);					// campo primo operatore 
	var secondo = document.querySelector(lista[1]);					// campo secondo operatore
	var campoRisultato = document.querySelector(lista[2]);		// campo risultato somma
	campoRisultato.focus();													// ogni volta che si inviano i dati la pagina si ricarica

	var impostaCaptcha = function (){
		var cas1 = (Math.random() * 9).toFixed(0);
		var cas2 = (Math.random() * 9).toFixed(0);
		primo.value = cas1;						
		secondo.value = cas2;
	}

	var risultato = parseInt(primo.value) + parseInt(secondo.value);
	if(risultato == campoRisultato.value){
		return true;
	}else{
		campoRisultato.value = '';
		impostaCaptcha();														// reimposta i valori degli operandi
		return false;
	}

}//

/*
//////// Esempio di invocazione funzione

boxForm.addEventListener('submit', function (event){
	var invioForm = captchaNumerico( ["#first", "#second", "#result"]);
	if(invioForm == true ){
		alert ('OK');
	} else {
		alert('ATTENZIONE: il valore dell\'operazione non è esatto');		
		event.preventDefault();			// blocca l'esecuzione di invio form
	}
},false);

*/

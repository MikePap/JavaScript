
function AnimaAltezza(elemNascosti, elemDettagli) {

	var elemento;											// rappresenta gli elementi nascosti da visualizzare		
	var vStile = 0;										// 
	var altezzaElementoNascosto;						// conserva il valore altezza dell'elemento nascosto
	var incremento = 10;								// valore incremento di crescita dell'altezza

	var altezza = function() {
		if(elemento)
			return window.getComputedStyle(elemento).height || document.defaultView.getComputedStyle(elemento, null)['height'];
	}


	var visualizza = function() {

		if(altezza() === 'auto'){						// vuol dire che l'elemento è nascosto (display:none)
			elemento.style.display = 'block';		
// NB: Il valore dell'altezza totale dell'elemento nascosto la si può rilevare solo ora
			altezzaElementoNascosto = parseFloat(altezza());	
			elemento.style.height = incremento+'px';
			vStile = incremento;
		}else{
			vStile += incremento;
		}

		if(vStile > altezzaElementoNascosto ){ return }
		elemento.style.height = vStile+'px';
		elemento.style.display = 'block';		
		setTimeout(visualizza, 10);
	};// 


	var riduci = function() {

		if(vStile === 0){ 
			elemento.style.display = 'none';			
			return;
		}
		if(vStile < 10){
			elemento.style.height = 0;
			elemento.style.display = 'none';
			return;
		}	

		vStile -= incremento;
		elemento.style.height = vStile+'px';
		setTimeout(riduci, 10);						
	};//


	var nascondiSimili = function() {
		var tutti = document.querySelectorAll(elemNascosti);
		for(var a=0, tutto; tutto = tutti[a]; a++){
			tutto.style.display = 'none';
			tutto.style['height'] = 'auto';
		}
	};//


	var suGiu = function() {
		var dettagli = document.querySelectorAll(elemDettagli);						
		for(var i=0, dettaglio; dettaglio = dettagli[i]; i++){
			dettaglio.addEventListener('click', 
			function (event){
				var et = event.target;
				var successivo = et.nextElementSibling;					// "nextElementSibling" non supportato in IE 8 
				elemento = successivo;
				var d = window.getComputedStyle(successivo).display;		
	
				if(d === 'none'){
					nascondiSimili();
					visualizza();
				}else{
					if(parseFloat(altezza()) === 0){
						nascondiSimili();
						visualizza();
					}else { 
						riduci() 
					}
				}
			}, false); 
		}
	}();  
}


/*
let AnimaAltezza = (elemNascosti, elemDettagli) => {

	let elemento;											// rappresenta gli elementi nascosti da visualizzare		
	let vStile = 0;										// 
	let altezzaElementoNascosto;						// conserva il valore altezza dell'elemento nascosto
	const incremento = 10;								// valore incremento di crescita dell'altezza

	let altezza = () => {

		if(elemento)
			return window.getComputedStyle(elemento).height || document.defaultView.getComputedStyle(elemento, null)['height'];
	}


	let visualizza = () => {

		if(altezza() === 'auto'){						// vuol dire che l'elemento è nascosto (display:none)
			elemento.style.display = 'block';		
// NB: Il valore dell'altezza totale dell'elemento nascosto la si può rilevare solo ora
			altezzaElementoNascosto = parseFloat(altezza());	
			elemento.style.height = incremento+'px';
			vStile = incremento;
		}else{
			vStile += incremento;
		}

		if(vStile > altezzaElementoNascosto ){ return }
		elemento.style.height = vStile+'px';
		elemento.style.display = 'block';		
		setTimeout(visualizza, 10);
	};// 


	let riduci = () => {

		if(vStile === 0){ 
			elemento.style.display = 'none';			
			return;
		}
		if(vStile < 10){
			elemento.style.height = 0;
			elemento.style.display = 'none';
			return;
		}	

		vStile -= incremento;
		elemento.style.height = vStile+'px';
		setTimeout(riduci, 10);						
	};//


	let nascondiSimili = () => {
		let tutti = document.querySelectorAll(elemNascosti);
		for(let a=0, tutto; tutto = tutti[a]; a++){
			tutto.style.display = 'none';
			tutto.style['height'] = 'auto';
		}
	};//


	let suGiu = (() => {
		const dettagli = document.querySelectorAll(elemDettagli);						
		for(let i=0, dettaglio; dettaglio = dettagli[i]; i++){
			dettaglio.addEventListener('click', 
			function (event){
				let et = event.target;
				let successivo = et.nextElementSibling;					// "nextElementSibling" non supportato in IE 8 
				elemento = successivo;
				let d = window.getComputedStyle(successivo).display;		
	
				if(d === 'none'){
					nascondiSimili();
					visualizza();
				}else{
					if(parseFloat(altezza()) === 0){
						nascondiSimili();
						visualizza();
					}else { 
						riduci() 
					}
				}
			}, false); 
		}
	})();  
}
*/
export {AnimaAltezza} 


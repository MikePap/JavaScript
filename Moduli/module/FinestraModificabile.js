// refer to Finestra_Modificabile.html 

/*
La funzione finestraModificabile() permette di gestire un elemento box, (è il caso di una finestrella), potendo sia spostarlo che modificare le sue dimensioni. Accetta sei argomenti:
- box:					è l'elemento genitore ( finestra )
- titoloFinestra:		elemento che sta nella parte superiore del 'box' che fa da intestazione (titolo) alla finestra
- chiudiFinestra:		elemento, rappresentato das una "X", che permette una eventuale chiusura (oscurazione) della finestra 
- angoloms:				elemento nell'angolo in basso a destra, rappresentato da ".:", per la modifica delle dimensioni di width e height
- latodx:				elemento posto lungo il bordo destro della finestrella
- latobx:				elemento posto lungo la base della finestrella

La funzione finestraModificabile() può essere applicata sia individualmente che congiuntamente alla funzione creaFinestrella()

Esempio di chiamata della funzione:

	-->	finestraModificabile("div.boxfm", "div.topfm", "div.xfm", "div.angolofm", "div.latodx", "div.latobx");

(gli argomenti passati sono quelli obbligatori quando viene creata una finestrella con la funzione "creaFinestrella()" nel file "creaFinestra.js" )

*/

export default function finestraModificabile(box, titoloFinestra, chiudiFinestra, angoloms, latodx, latobx){

//	Variabili
	var box = document.querySelector(box);								// elemento box finestra modificabile
	var divTop = document.querySelector(titoloFinestra);			// elemento superiore titolo finestra
	var chiudi = document.querySelector(chiudiFinestra);			// elemento che chiude (oscura) la finestra 
	var divAngolo = document.querySelector(angoloms);				// elemento angolo in basso a destra per la modifica di 'width' e 'height'
	var latodx = document.querySelector(latodx);						// elemento lato destro per modifica 'width'
	var latobx = document.querySelector(latobx);						// elemeto in basso per modifica 'height'


	var divAngolo = document.querySelector(angoloms);				// elemento angolo in basso a destra per la modifica delle dimensioni
	var chiudi = document.querySelector(chiudiFinestra);			// elemento che chiude (oscura) la finestra 

//	altezza finestra 
	let hWindow = () =>  window.innerHeight || window.screen.availHeight;			
	

//	larghezza finestra
	let lWindow = () => window.screen.width;

//	posizione 'left' di #box
	let boxLeft = () => box.offsetLeft;													

//	posizione 'top' di #box
	let boxTop = () => box.offsetTop;													

//	altezza del box
	let altezzaBox = () => parseInt(window.getComputedStyle(box).height);				

//	larghezza del box 
	let larghezzaBox = () => parseInt(window.getComputedStyle(box).width);				

//	posizione bottom di box 
	let posBottom = () => hWindow() - posTop() - altezzaBox();						


//	### Modifica delle dimensioni della finestra (width e height contemporaneamente) ###
	let dimensioni = (event) => {
			var mod_larghezza = event.pageX - boxLeft();
			var mod_altezza =   event.pageY - boxTop();

			box.style['width'] = mod_larghezza+ "px";
			box.style['height'] = mod_altezza+ "px";
	}

	let muove = () => window.addEventListener("mousemove", dimensioni, false);
	let smuove = () => window.removeEventListener("mousemove", dimensioni, false);

//	Ciamate delle funzioni per la esecuzione delle modifiche delle dimensioni del box  
	!function modDimensioni(){
		divAngolo.addEventListener("mousedown", muove, false);
		window.addEventListener('mouseup', smuove ,false);
	}();

//@@@ le seguenti sono funzioni per la modifica di width e height separatamente @@@

//### Modifica delle dimensioni della larghezzza della finestrella ###
	var dimensioni_dx = (event) => {
		var mod_larghezza = event.pageX - boxLeft();
		box.style['width'] = mod_larghezza+ "px";
	}

	var muove_dx = () => window.addEventListener("mousemove", dimensioni_dx, false);
	var smuove_dx = () => window.removeEventListener("mousemove", dimensioni_dx, false);

//	Chiamate delle funzioni per la esecuzione delle modifiche della larghezza del box  
	!function modDimensioni_dx(){
		latodx.addEventListener("mousedown", muove_dx, false);
		window.addEventListener("mouseup", smuove_dx ,false);
	}();


//### Modifica delle dimensioni dell'altezza della finestrella ###
	var dimensioni_bx = (event) => {
		var mod_altezza =   event.pageY - boxTop();
		box.style['height'] = mod_altezza+ "px";
	}

	var muove_bx = () => window.addEventListener("mousemove", dimensioni_bx, false);
	var smuove_bx = () => window.removeEventListener("mousemove", dimensioni_bx, false);

//	Chiamate delle funzioni per la esecuzione delle modifiche dell'altezza del box  
	(function modDimensioni_bx(){
		latobx.addEventListener("mousedown", muove_bx, false);
		window.addEventListener("mouseup", smuove_bx ,false);
	})();


//### Spostamento del box (drag e drop) ###

	var left_inizio, top_inizio;

//	Imnpostazioni alla premuta sull'angolo in basso a destra del box 
	let premuto = (event) => {
		box.style['opacity'] = 0.4;
//		this.style['cursor'] = "move";							// da errore 
		event.target.style['cursor'] = "move";
		left_inizio = event.pageX - boxLeft();
		top_inizio =  event.pageY - boxTop();
	}

//	Impostazione dei valori di spostamento 
	let spostamenti = (event) => {
		let top = event.pageY - top_inizio;
		let left = event.pageX - left_inizio;
		let tl = lWindow() - larghezzaBox();	
		let th = hWindow() - altezzaBox();

		if( event.pageX  < (tl + left_inizio)  && event.pageX > left_inizio &&  event.pageY > 0 ){
			box.style['top'] = top+"px";
			box.style['left'] = left+"px";
		}
	}

//	Esecuzione dello spostamento 
	let muovi =() => window.addEventListener("mousemove", spostamenti, false); 

//	Interruzione dello spostamento
	let smuovi = () => window.removeEventListener("mousemove", spostamenti, false);

// Chiamate dell'esecuzione e interruzione dello spostamento
	!function eseguiSpostamento(){
		divTop.addEventListener("mousedown", premuto, false);
		divTop.addEventListener("mousedown", muovi, false);
		window.addEventListener('mouseup', function(){
			box.style['opacity'] = 1;
			smuovi();
		} ,false);
	}();


//	Chiusura (oscuramento) del box 
	chiudi.addEventListener("click", function(){ 
		box.style['display'] = "none";
	},false);

}; // 







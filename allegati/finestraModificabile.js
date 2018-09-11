// refer to finestra-modificabile.html 

//###	Crea elementi con la possibilità di impostare gli attributi e stili nonchè la stringa testo per l'elemento creato
function creaElementi(name, attributi, stili) {
	var node = document.createElement(name);
	if (attributi) {
		for (var attr in attributi)
			if (attributi.hasOwnProperty(attr))
			node.setAttribute(attr, attributi[attr]);
	}

	for(var s in stili) 
		if (stili.hasOwnProperty(s))
			node.style[s] = stili[s];	

	for (var i = 3; i < arguments.length; i++) {
		var child = arguments[i];
		if (typeof child == "string")
			child = document.createTextNode(child);
		node.appendChild(child);
	}
	return node;
}//

/*
La funzione "creaFinestrella()" crea un box (una finestrella). Il box contiene un elemento titolo; un elemento (X) per la chiusura della finestrella, posto di lato al titolo; il corpo, dove sarà inserito il contenuto. Inoltre contiene tre elementi per la modifica delle dimensioni della finestrella (width e height); un elemento 'angolo' (rappresentato da ".:") posto nell'angolo in basso a destra del box  che serve per modificare le dimensioni di 'width' e 'height' contemporaneamente (grazie alla funzione "finestraModificabile)"; un elemento 'lato-destro', posto lungo il bordo destro della finestrella (per la modifica della larghezza) ed un elemento posto lungo la base della finestrella (per la modificas dell'altezza). Gli argomenti accettati sono:
- testoTitolo:			è il testo che sarà viibile nell'elemento titolo 
- coloreTitolo:		colore del testo del titolo 
- sfondoTitolo:		colore di sfondo dell'elemento titolo 
- coloreX:				colore della X
- sfondoX:				colore di sfondo della X 
- testoCorpo:			è il testo che sarà visibile nel corpo della finestrella
- coloreCorpo:			colore del testo del corpo 
- sfondoCorpo:			colore di sfondo del corpo 

*/

function creaFinestrella(testoTitolo, coloreTitolo, sfondoTitolo, coloreX, sfondoX, testoCorpo, coloreCorpo, sfondoCorpo){

//	Elemento genitore (box finestra)
	var finestrafm = creaElementi('div', {'class':'boxfm'}, {'position':'absolute', 'top':0, 'left':0, 'width':'310px', 'border':'1px solid #705d5d', 'boxShadow':'0px 10px 10px 1px grey','display':'none', 'z-index':100});						

//	Elemento top che sta nella parte alta della finestra e che comprende il titolo e la X 
	var topfm = creaElementi('div', {'class':'topfm'}, {'position':'relative', 'width':'100%', 'margin':0, 'padding':0, 'textAlign':'center', 'overflow':'auto', 'display':'flex', 'z-index':103 });

	finestrafm.appendChild(topfm);

//	Elemento titolo 
	var titolofm = creaElementi('div', {'class':'titolofm'}, {'flex':'calc(100% - 35px)', 'margin':0, 'padding':'3px 0', 'background':sfondoTitolo, 'color':coloreTitolo, 'fontSize':'1.5rem', 'fontFamily':'Verdana'}, testoTitolo ); 

//	Elemento X (chiusura/oscuramento) finestra
	var xfm = creaElementi('div', {'class':'xfm'}, {'flex':'auto',  'margin':0, 'padding':'0 1px', 'background': sfondoX, 'color': coloreX, 'fontSize':'1.5rem', 'cursor':'pointer', 'fontFamily':'Verdana'}, 'X' );
	
	topfm.appendChild(titolofm);
	topfm.appendChild(xfm);

//	Elemento corpo (che contiene il contenuto della finestra)
	var corpofm = creaElementi('div', {'class':'corpofm'}, {'padding':'0.5em', 'background':sfondoCorpo, 'color':coloreCorpo, 'z-index':101}, testoCorpo);
	finestrafm.appendChild(corpofm);

//	Elemento angolo bottom-right (posto nell'angolo in basso a destra per la modifica di 'width' e 'height' della finestra)	
	var angolofm = creaElementi('div', {'class':'angolofm'}, {'position':'absolute', 'bottom':0, 'right':0, 'cursor':'nw-resize', 'z-index':103 }, '.:');
	finestrafm.appendChild(angolofm);

//	Elemento lato destro (per la modifica della 'width' della finestrella)
	var lato_dx = creaElementi('div', {'class':'latodx'}, {'position':'absolute', 'right':0, 'top':0, 'bottom':'1em', 'width':'8px', 'height':'calc(100% -1em)', 'cursor':'e-resize', 'z-index':102});
	finestrafm.appendChild(lato_dx);

//	Elemento lato bottom (per la modifica della 'height' della finestrella)
	var lato_bx = creaElementi('div', {'class':'latobx'}, {'position':'absolute', 'bottom':0, 'left':0, 'right':'1em', 'width':'calc(100% -10px)', 'height':'8px', 'cursor':'s-resize', 'z-index':102});
	finestrafm.appendChild(lato_bx);

	document.body.appendChild(finestrafm);
}//

//////////////////////////////////////////////////////////////////////////////////////////////////////

/*
La funzione finestraModificabile() permette di gestire un elemento box, (è il caso di una finestrella), potendo sia spostarlo che modificare le sue dimensioni. Accetta sei argomenti:
- box:					è l'elemento genitore ( finestra )
- titoloFinestra:		elemento che sta nella parte superiore del 'box' che fa da intestazione (titolo) alla finestra
- chiudiFinestra:		elemento, rappresentato das una "X", che permette una eventuale chiusura (oscurazione) della finestra 
- angoloms:				elemento nell'angolo in basso a destra, rappresentato da ".:", per la modifica delle dimensioni di width e height
- latodx:				elemento posto lungo il bordo destro della finestrella
- latobx:				elemento posto lungo la base della finestrella

La funzione finestraModificabile() può essere applicata sia individualmente che congiuntamente alla funzione creaFinestrella()

*/

function finestraModificabile(box, titoloFinestra, chiudiFinestra, angoloms, latodx, latobx){

//	Variabili
	var box = document.querySelector(box);								// elemento box finestra modificabile
	var divTop = document.querySelector(titoloFinestra);			// elemento superiore titolo finestra
	var chiudi = document.querySelector(chiudiFinestra);			// elemento che chiude (oscura) la finestra 
	var divAngolo = document.querySelector(angoloms);				// elemento angolo in basso a destra per la modifica di 'width' e 'height'
	var latodx = document.querySelector(latodx);						// elemento lato destro per modifica 'width'
	var latobx = document.querySelector(latobx);						// elemeto in basso per modifica 'height'

//	altezza finestra 
	var hWindow = function(){
		return window.innerHeight || window.screen.availHeight;			
	};

//	larghezza finestra
	var lWindow = function(){
		return window.screen.width;
	};

//	posizione 'left' di #box
	var boxLeft = function(){
		return box.offsetLeft;													
	};

//	posizione 'top' di #box
	var boxTop = function(){
		return box.offsetTop;													
	};

//	altezza del box
	var altezzaBox = function(){
		return parseInt(window.getComputedStyle(box).height);				
	};

//	larghezza del box 
	var larghezzaBox = function(){
		return parseInt(window.getComputedStyle(box).width);				
	};

//	posizione bottom di box 
	var posBottom = function(){
		return hWindow() - posTop() - altezzaBox();						
	};


//	### Modifica delle dimensioni della finestra (width e height contemporaneamente) ###

	function dimensioni(event){
			var mod_larghezza = event.pageX - boxLeft();
			var mod_altezza =   event.pageY - boxTop();

			box.style['width'] = mod_larghezza+ "px";
			box.style['height'] = mod_altezza+ "px";
	}

	function muove(){
		window.addEventListener("mousemove", dimensioni, false);
	}

	function smuove(){
		window.removeEventListener("mousemove", dimensioni, false);
	}

//	Ciamate delle funzioni per la esecuzione delle modifiche delle dimensioni del box  
	(function modDimensioni(){
		divAngolo.addEventListener("mousedown", muove, false);
		window.addEventListener('mouseup', smuove ,false);
	})();



//@@@ le seguenti sono funzioni per la modifica di width e height separatamente @@@
/*

//### Modifica delle dimensioni della larghezzza della finestrella ###

	function dimensioni_dx(event){
			var mod_larghezza = event.pageX - boxLeft();
			box.style['width'] = mod_larghezza+ "px";
	}

	function muove_dx(){
		window.addEventListener("mousemove", dimensioni_dx, false);
	}

	function smuove_dx(){
		window.removeEventListener("mousemove", dimensioni_dx, false);
	}

//	Chiamate delle funzioni per la esecuzione delle modifiche della larghezza del box  
	(function modDimensioni_dx(){
		latodx.addEventListener("mousedown", muove_dx, false);
		window.addEventListener("mouseup", smuove_dx ,false);
	})();



//### Modifica delle dimensioni dell'altezza della finestrella ###
	function dimensioni_bx(event){
			var mod_altezza =   event.pageY - boxTop();
			box.style['height'] = mod_altezza+ "px";
	}

	function muove_bx(){
		window.addEventListener("mousemove", dimensioni_bx, false);
	}

	function smuove_bx(){
		window.removeEventListener("mousemove", dimensioni_bx, false);
	}

//	Chiamate delle funzioni per la esecuzione delle modifiche dell'altezza del box  
	(function modDimensioni_bx(){
		latobx.addEventListener("mousedown", muove_bx, false);
		window.addEventListener("mouseup", smuove_bx ,false);
	})();

*/

//### Spostamento del box (drag e drop) ###

	var left_inizio, top_inizio;

//	Impostazioni alla premuta sull'angolo in basso a destra del box 
	function premuto(event){
		box.style['opacity'] = 0.4;
		this.style['cursor'] = "move";
		left_inizio = event.pageX - boxLeft();
		top_inizio =  event.pageY - boxTop();
	}

//	Impostazione dei valori di spostamento 
	function spostamenti(event){
		var top = event.pageY - top_inizio;
		var left = event.pageX - left_inizio;
		var tl = lWindow() - larghezzaBox();	
		var th = hWindow() - altezzaBox();

		if( event.pageX  < (tl + left_inizio)  && event.pageX > left_inizio &&  event.pageY > 0 ){
			box.style['top'] = top+"px";
			box.style['left'] = left+"px";
		}
	}

//	Esecuzione dello spostamento 
	function muovi(){
		window.addEventListener("mousemove", spostamenti, false);
	}

//	Interruzione dello spostamento
	function smuovi(){
		window.removeEventListener("mousemove", spostamenti, false);
	}

// Chiamate dell'esecuzione e interruzione dello spostamento
	(function eseguiSpostamento(){
		divTop.addEventListener("mousedown", premuto, false);
		divTop.addEventListener("mousedown", muovi, false);
		window.addEventListener('mouseup', function(){
			box.style['opacity'] = 1;
			smuovi();
		} ,false);
	})();



//###	Chiusura (oscuramento) del box ###

	chiudi.addEventListener("click", function(){ 
		box.style['display'] = "none";
	},false);


}; // 


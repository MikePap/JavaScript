/* ### animazioniElementi.js ###
La funzione "Animazione" produce l'animazione su una o più proprietà CSS di un elemento
La funzione "fermaAnimazione" permette di bloccare l'animazione prodotta dalla funzione "Animazione"
*/

let animazmia = null;								// impostata nel setTimeout per un eventuale blocco dell'animazione

let Animazione = function (propCSS, valFinale, tempoMax, frame, elemento, elemStart, tipoEvento ){
//let Animazione = (propCSS, valFinale, tempoMax, frame, elemento, elemStart, tipoEvento ) => {
	this.prop = propCSS || [];						// la o le proprietà (può essere un array) dei CSS da animare 
	this.valFinale = valFinale || [];			// il o i (può essere un array) valore massimo di ingrandimento prodotto dall'animazione
	this.tempo = tempoMax;							// il tempo massimo di durata dell'animazione in millesecondi
	this.frame = frame;								// valore in millesecondi che in rapporto al 'tempoMax' stabilisce il tempo di interruzione 
	this.elemento = elemento;						// l'elemento da animare
	this.elemStart = elemStart;					// elemento che fa scattare l'animazione 
	this.evento = tipoEvento;						// il tipo di evento che fa scattere l'animazione 

	this.rpTmax = () => 	this.tempo / this.frame;						
	this.elem = () => document.querySelector(this.elemento); 

	this.clickStart = () => {
		var vai = document.querySelector(this.elemStart);
		vai.addEventListener(this.evento, this.start, false);
	}

	this.rilevaStile = (stile) => {
		var computedStyle = null;		
		if (typeof this.elem().currentStyle !== "undefined"){
			computedStyle = elemento.currentStyle;														//per IE
		}else{
//			computedStyle = document.defaultView.getComputedStyle(elem, null)[stile];		//altri browser
			computedStyle = window.getComputedStyle(this.elem())[stile];						//uguale al precedente
		}
		return parseInt(computedStyle);
	}

	this.start = () => {
		for(var i=0; i< this.prop.length; i++ ){
			var stile = this.prop[i];
//			var vStile = parseInt(window.getComputedStyle(this.elem())[stile]);
			var vStile = this.rilevaStile(stile);
			var vFinale = this.valFinale[i];
			if(vStile > vFinale ){return;}
			var diff = vFinale - vStile;
			var rpVmax = diff / this.rpTmax();
			vStile = vStile + rpVmax; 
			this.elem().style.setProperty(this.prop[i], vStile+'px');		

		}
			animazmia = setTimeout(this.start, this.rpTmax());						// 'animazmia' è collegata a 'fermaAnimazione' 
	}
} 

let fermaAnimazione = function (elemStop,tipoEvento){
//let fermaAnimazione = (elemStop,tipoEvento) => {
	this.elemStop = elemStop;						// elemento che blocca l'animazione 
	this.evento = tipoEvento;						// il tipo di evento che fa scattere l'animazione 

	this.clickStop = () => {
		var ferma = document.querySelector(this.elemStop);
		ferma.addEventListener(this.evento, this.stop, false);
	}

	this.stop = () => {
		if(animazmia)										
		clearTimeout(animazmia);						
	}
} 


export {Animazione, fermaAnimazione}



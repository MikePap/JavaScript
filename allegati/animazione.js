/*
#############################		Classi animazione di elementi		###################################
La classe contiene due metodi  che permette di eseguire o bloccare l'animazione su una proprietà dei CSS
*/

var Animazione = function (propCSS, valFinale, tempoMax, frame, elemento, elemStart, tipoEvento ){
	this.prop = propCSS || [];						// la o le proprietà (può essere un array) dei CSS da animare 
	this.valFinale = valFinale || [];			// il o i (può essere un array) valore massimo di ingrandimento prodotto dall'animazione
	this.tempo = tempoMax;							// il tempo massimo di durata dell'animazione in millesecondi
	this.frame = frame;								// valore in millesecondi che in rapporto al 'tempoMax' stabilisce il tempo di interruzione 
	this.elemento = elemento;						// l'elemento da animare
	this.elemStart = elemStart;					// elemento che fa scattare l'animazione 
	this.evento = tipoEvento;						// il tipo di evento che fa scattere l'animazione 

	var sto = this;

	this.rpTmax = function (){
		return this.tempo / this.frame;						
	}

	this.elem = function (){
		return document.querySelector(this.elemento);
	}

	this.clickStart = function(){
		var vai = document.querySelector(this.elemStart);
		Core.addEventListener(vai, sto.evento, sto.start);
	}

	this.start = function (){
		for(var i=0; i< sto.prop.length; i++ ){
			var vStile = Core.getComputedStyle(sto.elem(), sto.prop[i]);
			var vFinale = sto.valFinale[i];
			if(vStile > vFinale ){return;}
			var diff = vFinale - vStile;
			var rpVmax = diff / sto.rpTmax();
			vStile = vStile + rpVmax; 
			sto.elem().style.setProperty(sto.prop[i], vStile+'px');		// 'setProperty' NON SUPPORTATO IN IE 8
		}
			anim = setTimeout(sto.start, sto.rpTmax());						// la variabile 'anim' è collegata a 'fermaAnimazione' 
	}

} // "Animazione"



/*
// - Per invocare l'animazione:
var obj = new Animazione('width',2000,100,1000,'#kok','#start','click');
obj.clickStart();
*/

/////////////////////

//##### Funzione che permette di fermare un'animazione che è collegata (con prototype) alla precedente funzione "Animazione"  #####
var fermaAnimazione = function (elemStop,tipoEvento){

	this.elemStop = elemStop;						// elemento che blocca l'animazione 
	this.evento = tipoEvento;						// il tipo di evento che fa scattere l'animazione 

	var sto = this;

	this.clickStop = function(){
		var ferma = document.querySelector(this.elemStop);
		Core.addEventListener(ferma, sto.evento, sto.stop);
	}

	this.stop = function (){
// la variabile 'anim' racchiude il setTimeout di "Animazione" e la si collega tramite 'prototype' dopo la creazione dell'oggetto da "Animazione"
		if(anim)										
		clearTimeout(anim);						
	}
} // "fermaAnimazione"

// *** fermaAnimazione.prototype = new Animazione();				// collegamento alla funzione "Animazione"
/*
// - Invocazione oggetto:
var ob = new fermaAnimazione('#blocca','click');
ob.clickStop();
*/

/*
//##### Classe uguale alla funzione costruttore "Animazione" definita coma metodo  ##### 
var Animazione = 
{
//	Proprietà impostabili		
	propCSS:		'width',							// la proprietà dei CSS da animare 
	tempoMax:	1000,								// il tempo massimo di durata dell'animazione in millesecondi 
	frame:		100,								// valore in millesecondi che in rapporto al 'tempoMax' stabilisce il tempo di interruzione  
	valoreMax:	1000,								// il valore massimo di ingrandimento prodotto dall'animazione 
	elemento:	'#kok',							// l'elemento da animare 
	elemStart:	'#start',						// elemento che fa scattare l'animazione 	
	elemStop:	'#blocca',						// elemento che blocca l'animazione 
	tipoEvento:	'click',							// il tipo di evento che fa scattere l'animazione 

	rpTmax: function ()
	{
		return Animazione.tempoMax / Animazione.frame;						
	},

	rpVmax: function ()
	{
		var elem = document.querySelector(Animazione.elemento);
		var valStile = Core.getComputedStyle(elem, Animazione.propCSS);	
		var diff = Animazione.valoreMax - valStile; 
		return diff / Animazione.rpTmax(); 
	},

	clickStart: function()
	{
		var vai = document.querySelector(Animazione.elemStart);
		Core.addEventListener(vai, Animazione.tipoEvento, Animazione.start);
	},

	clickStop: function()
	{
		var ferma = document.querySelector(Animazione.elemStop);
		Core.addEventListener(ferma, Animazione.tipoEvento, Animazione.stop);
	},

	start: function () 
	{
		var elem = document.querySelector(Animazione.elemento);		
		var valStile = Core.getComputedStyle(elem, Animazione.propCSS);				
		if(valStile > Animazione.valoreMax){return};
		valStile = valStile + Animazione.rpVmax();
//		elem.style.width = valStile+'px';													// per IE 8 										
		elem.style.setProperty(Animazione.propCSS, valStile+'px');					// 'setProperty' NON SUPPORTATO IN IE 8				
		Animazione.tempo = setTimeout(Animazione.start, Animazione.rpTmax());
	},
	
	stop: function ()
	{
		if(Animazione.tempo)
		clearTimeout(Animazione.tempo)
	}
} // ### "Animazione" ###
*/
/* 
- Per richiamare l'animazione:		Animazione.clickStart();
- Per interrompere l'animazione:		Animazione.clickStop();
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
//@@@	La seguente classe si differenzia dalla precedente per il fatto che utilzza "setInterval()" invece che "setTimeout()"
var Animazione2 = 
{
	propCSS:		'width',							// la proprietà dei CSS da animare 
	tempoMax:	1000,								// il tempo massimo di durata dell'animazione in millesecondi 
	valoreMax:	1000,								// il valore massimo di ingrandimento prodotto dall'animazione 
	elemento:	'#kok',							// l'elemento da animare 
	elemStart:	'#start',						// elemento che fa scattare l'animazione 	
	elemStop:	'#blocca',						// elemento che blocca l'animazione 
	tipoEvento:	'click',							// il tipo di evento che fa scattere l'animazione 

	rpTmax: function ()
	{
		return Animazione2.tempoMax / 100;
	},

	rpVmax: function ()
	{
		var elem = document.querySelector(Animazione2.elemento);
		var valStile = Core.getComputedStyle(elem, Animazione2.propCSS);	
		var diff = Animazione2.valoreMax - valStile; 
//		return diff / Animazione2.rpTmax(); 
		return Animazione2.valoreMax / Animazione2.rpTmax(); 
	},

	clickStart: function()
	{
		var vai = document.querySelector(Animazione2.elemStart);
//		vai.addEventListener("click", Animazione.start, false);
		Core.addEventListener(vai, Animazione2.tipoEvento, Animazione.start);
	},

	clickStop: function()
	{
		var ferma = document.querySelector(Animazione2.elemStop);
		Core.addEventListener(ferma, Animazione2.tipoEvento, Animazione2.stop);
	},

	start: function () 
	{
		Animazione2.tempo = setInterval(
			function (){
				var elem = document.querySelector(Animazione2.elemento);
				var valStile = Core.getComputedStyle(elem, Animazione2.propCSS);
				if(valStile > Animazione2.valoreMax){return};
				valStile = valStile + Animazione2.rpVmax();
//				elem.style.width = valStile+'px';											// per IE 8 
				elem.style.setProperty(Animazione2.propCSS, valStile+'px');			// 'setProperty' NON SUPPORTATO IN IE 8
			}
		, Animazione2.rpTmax())
	},
	
	stop: function ()
	{
		if(Animazione2.tempo)
		clearInterval(Animazione2.tempo)
	}
} // ### Animazione2 ### 

*/
 


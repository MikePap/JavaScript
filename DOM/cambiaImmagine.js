// refer to "CambiaImmagine.html"

// funzione non utilizzata 
function get_firstChild(n)
{
	var y = n.firstChild;				// qui si instanzia 'y' come primo figlio di 'n' 
	while (y.nodeType!=1)		// controlla se il 'tipo' non è uno spazio vuoto o nuova linea (1 corrisponde al 'nodeType'  'Elemento')  
	{		
	  y = y.nextSibling;			// ... nel caso non fosse un elemento allora si instanzia 'y' come elemento fratello 
	}									
	return y;						// ... altrimenti restituisce il primo figlio di 'y'
} // "get_firstChild()"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadXMLDoc(dname)
{
	if (window.XMLHttpRequest)
	{
		xhttp=new XMLHttpRequest();
	}
	else
	{
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET",dname,false);
	xhttp.send(null);
	return xhttp.responseXML;
} // 

///////////////////////
/*
===================================================================================================================================================
---  funzione che permette di visualizzare delle immagini caricandole da un file xml grazie ad 'ajax'. Le immagini vengono dapprima caricate nell'elemento "box" e ridotte in miniatura grazie al parametro di riduzione "r". Poi vengono visualizzate ingrandite nell'elemento "visualizzaImg".
Le immagini possono essere cambiate tramite dei pulsanti di avanzamento e indietreggiamento. 
Si presuppone che gli elementi (tag) del file xml che contengono gli attributi di ogni immagine siano obbligatoriamente: <srcImg>, <titolo>, <altImg>, <larghezza>, <altezza> e <indice>.
====================================================================================================================================================
- "fileXML"					è il file xml che contiene gli attributi le immagini
- "elemXML"					è l'elemento genitore (del file xml) che racchiude gli attributi di ogni singola immagine  	
- "box"						è l'elemento che visualizza le immagini in miniatura caricate dal file xml 
- "visualizzaImg"			è l'elemento che visualizza l'immagine ingrandita in cui è presente un elemento <img /> vuoto 
- "scuro"					è l'elemento che oscura la finestra 
- "chiudi"					è l'elemento che chiude (x) 
- "dx e sx"					sono i pulsanti per l'avanzamento e indietreggiamento delle immagini
- "r"							è un valore di riduzione per fare diventare le immagini delle miniature

*/
function ScorriImgXML(fileXML, elemXML, box, visualizzaImg, scuro, chiudi, dx, sx, r)
{
	var boxMiniature = document.querySelector(box);
	var visualizzaIm = document.getElementById(visualizzaImg); 
	var scur = document.getElementById(scuro);
	var xImg = document.getElementById(chiudi);
	var frecciaDx = document.getElementById(dx);
	var frecciaSx = document.getElementById(sx);

	xmlDoc = loadXMLDoc(fileXML);														// carica il file .xml 

	immagine = xmlDoc.getElementsByTagName(elemXML);							// l'elemento genitore che contiene ogni immagine									

	for(var i=0; i< immagine.length; i++)
	{
		var src = immagine[i].children[0];
		var titolo = immagine[i].children[1];
		var alt = immagine[i].children[2];
		var larghezza = immagine[i].children[3];
		var larghezza = larghezza.childNodes[0].nodeValue / r;
		var altezza = immagine[i].children[4];
		altezza = altezza.childNodes[0].nodeValue / r;
		var indice = immagine[i].children[5];
		var imgUlivi = document.createElement("img");
		imgUlivi.setAttribute('src', src.childNodes[0].nodeValue);	
		imgUlivi.setAttribute('title', titolo.childNodes[0].nodeValue);	
		imgUlivi.setAttribute('alt', alt.childNodes[0].nodeValue);	
		imgUlivi.setAttribute('width', larghezza);	
		imgUlivi.setAttribute('height', altezza);	
		imgUlivi.setAttribute('indice', indice.childNodes[0].nodeValue);	
		boxMiniature.appendChild(imgUlivi);
	}

	var nuovoboxImg = document.querySelectorAll(box+ ' > img');
	var totImg = nuovoboxImg.length;	

	for(var a=0; a < nuovoboxImg.length; a++ )
	{
		Core.addEventListener(nuovoboxImg[a], 'click', 
		function (event)
		{
			visualizzaIm.style.display = "block";
			scur.style.display = "block";
			frecciaDx.style.display = "block";
			frecciaSx.style.display = "block";
			xImg.style.display = "block"; 
			var io = event.target;
			var clono = io.cloneNode(true);
			clono.style.height = "100%";
			clono.style.width = "auto";
			visualizzaIm.appendChild(clono);
			visualizzaIm.style.animation = "dissolvenza 2s";
			n = io.getAttribute('indice');									// si assegna ad 'n' il valore indice dell'immagine
		});	
	}

	Core.addEventListener(xImg, 'click', 	
	function ()
	{
		this.style.display = "none"; 
		scur.style.display = "none";
		frecciaDx.style.display = "none";
		frecciaSx.style.display = "none";
//		visualizzaIm.removeChild(visualizzaIm.firstChild);					// fa riferimento ad uno spazio vuoto
//		visualizzaIm.removeChild(visualizzaIm.childNodes[0]);				// fa riferimento ad uno spazio vuoto
		visualizzaIm.removeChild(visualizzaIm.childNodes[1]);				// OK
		visualizzaIm.style.display = "none";
	});

	// click freccia avanti 
	Core.addEventListener(frecciaDx, 'click',		 	
	function ()
	{
		visualizzaIm.removeChild(visualizzaIm.childNodes[1]);				
		if(n == immagine.length - 1)												// vuol dire che si è sull'ultima immagine ...
			{n = 0}																		// ... la riporto sulla prima ... 
		else
			{n++}	
		visualizzaIm.appendChild(miaimg(n));
	});

	// click freccia indietro 
	Core.addEventListener(frecciaSx, 'click',		 	
	function ()
	{
		visualizzaIm.removeChild(visualizzaIm.childNodes[1]);				
		if(n==0)																			// vuol dire che si è sulla prima immagine ... 
			n = immagine.length - 1;												// ... la porto sull'ultima ...
		else
			n--;	
		visualizzaIm.appendChild(miaimg(n));
	});

	//////////	 Eventi della tastiera 	/////////
	// tasto freccia-avanti (39)
	Core.addEventListener(window, 'keydown',		 	
	function (e)
	{
		if(e.keyCode == 39)
		{
			visualizzaIm.removeChild(visualizzaIm.childNodes[1]);				
		if(n == immagine.length - 1)												// vuol dire che si è sull'ultima immagine ...
			{n = 0}																		// ... la riporto sulla prima ... 
		else
			{n++}	
			visualizzaIm.appendChild(miaimg(n));
		}
	});

	// tasto freccia-indietro (37)
	Core.addEventListener(window, 'keydown',		 	
	function (e)
	{
		if(e.keyCode == 37)
		{
			visualizzaIm.removeChild(visualizzaIm.childNodes[1]);				
			if(n==0)																			// vuol dire che si è sulla prima immagine ... 
				n = immagine.length - 1;												// ... la porto sull'ultima ...
			else
				n--;	
			visualizzaIm.appendChild(miaimg(n));
		}
	});

	// tasto 'Home' (36)
	Core.addEventListener(window, 'keydown',		 	
	function (e)
	{
		if(e.keyCode == 36)
		{
			visualizzaIm.removeChild(visualizzaIm.childNodes[1]);				
			n=0;
			visualizzaIm.appendChild(miaimg(n));
		}
	});

	// tasto 'Fine' (35)
	Core.addEventListener(window, 'keydown',		 	
	function (e)
	{
		if(e.keyCode == 35)
		{
			visualizzaIm.removeChild(visualizzaIm.childNodes[1]);				
			n=immagine.length - 1;
			visualizzaIm.appendChild(miaimg(n));
		}
	});

	// tasto 'Esc' (27)
	Core.addEventListener(window, 'keydown',		 	
	function (e)
	{
		if(e.keyCode == 27)
		{
			xImg.style.display = "none"; 
			scur.style.display = "none";
			frecciaDx.style.display = "none";
			frecciaSx.style.display = "none";
			visualizzaIm.removeChild(visualizzaIm.childNodes[1]);				// OK
			visualizzaIm.style.display = "none";
		}
	});

	// funzione che crea un'immagine in base ad un parametro 'n' che identifica il suo tag <indice> 
	function miaimg(n)
	{
		var srcn = immagine[n].children[0];
		var titolon = immagine[n].children[1];
		var altn = immagine[n].children[2];
		var imm  = document.createElement("img");
		imm.setAttribute('src', srcn.childNodes[0].nodeValue);	
		imm.setAttribute('title', titolon.childNodes[0].nodeValue);	
		imm.setAttribute('alt', altn.childNodes[0].nodeValue);	
		imm.setAttribute('height', '100%');	
		imm.setAttribute('width', 'auto');
		imm.style.animation = "dissolvenza 2s";	
		return imm;
	}
} // "ScorriImgXML()"


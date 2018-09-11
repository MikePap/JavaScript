// creaFinestra.js

// Importazione della funzioni "creaNodi()" per creare nodi HTML
import creaElementi from "./creaNodi.js";

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

@@@ NB: l'elemento box creato è un <div> definito con un nome preciso che è "boxfm" ( <div  class="boxfm"> )

*/


export default function creaFinestrella(testoTitolo, coloreTitolo, sfondoTitolo, coloreX, sfondoX, testoCorpo, coloreCorpo, sfondoCorpo){
//	Elemento genitore (box finestra)
	var finestrafm = creaElementi('div', {'class':'boxfm'}, {'position':'absolute', 'top':0, 'left':0, 'width':'310px', 'border':'1px solid #705d5d', 'boxShadow':'0px 10px 10px 1px grey','display':'none', 'zIndex':100});						

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




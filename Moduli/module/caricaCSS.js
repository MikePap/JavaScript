/* ### caricaCSS.js ###
Permette di caricare un file CSS dinamicamente all'interno del documento posizionandolo nel tag <head>
*/
export default function caricaCSS(scriptCSS){
	var linkElem = document.createElement('link');
	linkElem.setAttribute('rel', 'stylesheet');
	linkElem.setAttribute('type', 'text/css');
//	linkElem.setAttribute('id', 'linkElement');
	linkElem.setAttribute('href', scriptCSS);
	document.head.appendChild(linkElem);
}  


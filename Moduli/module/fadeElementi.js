// ### fadeElementi.js ### 

function dissolvenza (elemento)  {
	const elem = document.querySelector(elemento);
	const visualizzazione = window.getComputedStyle(elem).display || document.defaultView.getComputedStyle(elem, null)['display'];
	if(visualizzazione === 'none'){
		elem.style.display = 'block';		
	}
	var vStile = window.getComputedStyle(elem)["opacity"];
	const vFinale = 1;
	if(vStile > vFinale){return;}
	vStile = parseFloat(vStile) + 0.02;								// impostabili  0.1/2=> 0.05  
	elem.style.opacity = vStile;
	setTimeout(dissolvenza.bind(this, elemento), 50);			// impostabili 50/0.1=> 500 (millesecondi) 
}; 

export {dissolvenza}



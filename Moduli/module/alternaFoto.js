/* ### alternaFoto.js ###
La funzione permette l'alternare delle immagini 
@@ Purtoppo la dissolvenza funziona solo alla prima serie, in Firefox; in Chrome neanche quella
*/
export default	function AlternaFoto(elemento, ritardo){

	var n=8;									// inizializzazione (inserendo un numero maggiore del totale immagini si riconduce alla prima)
	var immagini = document.querySelectorAll(elemento+ ' > img');
	var nImg = immagini.length;

console.log(nImg);

	var alterna = () => {

		if(n < (nImg -1)) {
			++n;
			immagini[n-1].style.display = 'none';
		}else{
			n=0;
			immagini[nImg -1].style.display = 'none';
		}

		immagini[n].style.display = 'block';
		immagini[n].style.animation = "dissolvenza 2s";
//		immagini[nImg -1].style.opacity = 1;			
		setTimeout(alterna, ritardo);
	}

	alterna();

}; // 


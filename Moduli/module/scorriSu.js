//
// Impostazione "scroll" del documento al valore stabilito nel parametro "val"
var scrolla = function(val) {
	window.pageYOffset = val;
	document.documentElement.scrollTop = val;
	document.body.scrollTop = val;
}

//////////////////////////////		Per i vecchi browser		/////////////////////////////////////

function ScrollPage(tempoScroll, frame, freccia, valShowFreccia) {

	var valScorrimentoY;
	var frecciaNera = document.getElementById(freccia);		

	var rp = function () {
		return tempoScroll / frame;
	}

	var getScrollTop = function () {
		return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	}

	var vaiSu = function() {
		if(getScrollTop() <= rp() ){ 
			scrolla(0);
		}
		if(getScrollTop() === 0){ return;}
		valScorrimentoY = getScrollTop() - ( getScrollTop() / rp()); 
		scrolla(valScorrimentoY);
//		setTimeout(vaiSu, rp());								// va bene anche questa
		setTimeout(vaiSu.bind(this), rp());
	}//


	var clickScroll = function (){
		frecciaNera.addEventListener('click', vaiSu, false);
	}
	clickScroll();

	var showFreccia = function() {
		var frecciaNera = document.getElementById(freccia);		
		window.addEventListener('scroll', function (){
			if(getScrollTop() > valShowFreccia)
				frecciaNera.style.display = "block";
			else
				frecciaNera.style.display = "none";
		},false);	
	}()

};// 


/*
//////////////////////////////////////		con metodi ES6		////////////////////////////////////////

let ScrollPage = (tempoScroll, frame, freccia, valShowFreccia) => {

	let valScorrimentoY;
	let rp = () => tempoScroll / frame;	
	let getScrollTop = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	let frecciaNera = document.getElementById(freccia);		

	let vaiSu = () => {
		if(getScrollTop() <= rp() ){ 
			scrolla(0);
		}

		if(getScrollTop() === 0){ return;}
		valScorrimentoY = getScrollTop() - ( getScrollTop() / rp()); 
		scrolla(valScorrimentoY);
		setTimeout(vaiSu, rp());
	}

	let clickScroll = function (){
		frecciaNera.addEventListener('click', vaiSu, false);
	}();

	let showFreccia = function() {
		window.addEventListener('scroll', function (){
			if(getScrollTop() > valShowFreccia)
				frecciaNera.style.display = "block";
			else
				frecciaNera.style.display = "none";
		},false);	
	}()

}; 
*/

export {ScrollPage}


